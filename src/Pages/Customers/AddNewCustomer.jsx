import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";
import { PlusIconSVG } from "../../utils/SVGs/SVGs";

const MyVerticallyCenteredModal = ({ show, onHide, setIsUpdated }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [customer, setCustomer] = useState({
    contact_name: "",
    company_name: "",
    email_address: "",
    mobile_no: "",
    address: "",
    phone_no: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCustomer((prev) => ({ ...prev, [id]: value }));
  };

  const addNewCustomer = async (event) => {
    try {
      setIsDisabled(true);

      const formData = new FormData(event.currentTarget);
      formData.append("contact_name", customer.contact_name);
      formData.append("company_name", customer.company_name);
      formData.append("email_address", customer.email_address);
      formData.append("mobile_no", customer.mobile_no);
      formData.append("address", customer.address);
      formData.append("phone_no", customer.phone_no);

      const url = `${apiUrl}/customers`;
      const result = await axios.post(url, formData, {
        headers: headerOptions(true),
      });

      console.log("result add new customer: ", result);
      if (result.status === 201) {
        ReactHotToast(result.data.message, "success");
        onHide();
        setIsUpdated((prev) => !prev);
        setCustomer({
          contact_name: "",
          company_name: "",
          email_address: "",
          mobile_no: "",
          address: "",
          phone_no: "",
        });
      }
    } catch (e) {
      // ReactHotToast(e.response.data.message, "error");
      Object.values(e.response.data.error).forEach((error) =>
        ReactHotToast(error, "error")
      );
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddNewCustomer = (e) => {
    e.preventDefault();

    const { contact_name, company_name, email_address, mobile_no } = customer;

    const bool = [contact_name, company_name, email_address, mobile_no].every(
      Boolean
    );

    if (bool) {
      addNewCustomer(e);
    } else {
      const conditions = {
        [!contact_name]: "Please input name!",
        [!company_name]: "Please input company!",
        [!email_address]: "Please input email!",
        [!mobile_no]: "Please input contact!",
      };

      const errorMessage = conditions[true];

      if (errorMessage) {
        ReactHotToast(errorMessage, "error");
      }
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
          New Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleAddNewCustomer}
          className="d-flex flex-column gap-3 justify-content-center align-items-center"
        >
          <div className="group">
            <label htmlFor="contact_name">Name</label>
            <input
              type="text"
              id="contact_name"
              value={customer.contact_name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="company_name">Company</label>
            <input
              type="text"
              id="company_name"
              value={customer.company_name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="email_address">Email</label>
            <input
              type="email"
              id="email_address"
              value={customer.email_address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="mobile_no">Mobile</label>
            <input
              type="number"
              id="mobile_no"
              value={customer.mobile_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="phone_no">Landline (optional)</label>
            <input
              type="number"
              id="phone_no"
              value={customer.phone_no}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address (optional)</label>
            <textarea
              type="text"
              id="address"
              value={customer.address}
              onChange={(e) => handleChange(e)}
              rows={3}
            />
          </div>

          <button type="submit" className="cta-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Add New Customer"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const AddNewCustomer = ({ setIsUpdated }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="cta-btn">
        Add New Customer
        <span>
          <PlusIconSVG />
        </span>
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsUpdated={setIsUpdated}
      />
    </>
  );
};
