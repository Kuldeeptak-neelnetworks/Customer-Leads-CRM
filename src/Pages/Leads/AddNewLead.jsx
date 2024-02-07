import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";
import { PlusIconSVG } from "../../utils/SVGs/SVGs";

const MyVerticallyCenteredModal = ({
  show,
  onHide,
  setIsUpdated,
  customers,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lead, setLead] = useState({
    customer: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLead((prev) => ({ ...prev, [id]: value }));
  };

  const addNewLead = async (event) => {
    try {
      setIsDisabled(true);

      const formData = new FormData(event.currentTarget);
      formData.append("customer_id", lead.customer);

      const url = `${apiUrl}/leads`;
      const result = await axios.post(url, formData, {
        headers: headerOptions(true),
      });

      console.log("result add new lead: ", result);

      if (result.status === 201) {
        ReactHotToast(result.data.message, "success");
        onHide();
        setIsUpdated((prev) => !prev);
        setLead({
          customer: "",
        });
      }
    } catch (e) {
      Object.values(e.response.data.error).forEach((error) =>
        ReactHotToast(error, "error")
      );
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddNewLead = (e) => {
    e.preventDefault();
    if (lead.customer) {
      addNewLead(e);
    } else {
      ReactHotToast("Please select Customer!", "error");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="pt-3 pb-1" closeButton>
        <Modal.Title className="w-100" id="contained-modal-title-vcenter">
          New Lead
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleAddNewLead}
          className="d-flex flex-column gap-3 justify-content-center align-items-center"
        >
          <div className="group">
            <label htmlFor="customer">Customer</label>
            <select
              id="customer"
              value={lead.customer}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Customer</option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.contact_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="cta-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Add New Lead"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const AddNewLead = ({ setIsUpdated, customers }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="cta-btn w-50">
        Add New Lead
        <span>
          <PlusIconSVG />
        </span>
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsUpdated={setIsUpdated}
        customers={customers}
      />
    </>
  );
};
