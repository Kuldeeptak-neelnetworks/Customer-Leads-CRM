import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";

const MyVerticallyCenteredModal = ({
  show,
  onHide,
  setIsUpdated,
  customers,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lead, setLead] = useState({
    customer: { label: "", value: "" },
    phone_no: "",
    address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLead((prev) => ({ ...prev, [id]: value }));
  };

  const addNewLead = async () => {
    try {
      setIsDisabled(true);
      const url = `${apiUrl}/leads`;
      const result = await axios.post(
        url,
        { customer_id: lead.customer },
        {
          headers: headerOptions(),
        }
      );

      console.log("result add new lead: ", result);
      if (result.status === 201) {
        ReactHotToast(result.data.message, "success");
        onHide();
        setIsUpdated((prev) => !prev);
        setLead({
          customer: "",
          phone_no: "",
          address: "",
        });
      }
    } catch (e) {
      ReactHotToast(e.response.data.message, "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddNewLead = (e) => {
    e.preventDefault();
    const bool = [lead.customer, lead.address, lead.phone_no].every(Boolean);

    if (bool) {
      addNewLead();
    } else {
      ReactHotToast("Fill all the Details!", "error");
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
          <div className="d-flex justify-content-center align-items-center gap-3">
            <span className="modal-title">New Lead</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form
          onSubmit={handleAddNewLead}
          className="d-flex flex-column gap-2 justify-content-center align-items-center"
        >
          <div className="group">
            <label htmlFor="customer">Customer</label>
            <select
              id="customer"
              value={lead.customer}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.contact_name}
                </option>
              ))}
            </select>
          </div>
          <div className="group">
            <label htmlFor="phone_no">Landline</label>
            <input
              type="tel"
              id="phone_no"
              value={lead.phone_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={lead.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button type="submit" className="custom-btn" disabled={isDisabled}>
            Add
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
      <div
        onClick={() => {
          setModalShow(true);
        }}
      >
        <button className="add-new-btn">Add New Lead</button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsUpdated={setIsUpdated}
        customers={customers}
      />
    </>
  );
};
