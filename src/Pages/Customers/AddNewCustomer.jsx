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

  const addNewCustomer = async () => {
    try {
      setIsDisabled(true);
      const url = `${apiUrl}/customers`;
      const result = await axios.post(url, customer, {
        headers: headerOptions(),
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
      ReactHotToast(e.response.data.message, "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddNewCustomer = (e) => {
    e.preventDefault();
    const bool = [
      customer.contact_name,
      customer.company_name,
      customer.email_address,
      customer.mobile_no,
      customer.address,
      customer.phone_no,
    ].every(Boolean);

    if (bool) {
      addNewCustomer();
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
            <span className="modal-title">New Customer</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form
          onSubmit={handleAddNewCustomer}
          className="d-flex flex-column gap-2 justify-content-center align-items-center"
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
              type="text"
              id="email_address"
              value={customer.email_address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="mobile_no">Mobile</label>
            <input
              type="tel"
              id="mobile_no"
              value={customer.mobile_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="phone_no">Landline</label>
            <input
              type="tel"
              id="phone_no"
              value={customer.phone_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={customer.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button type="submit" className="custom-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Add"}
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
      <button onClick={() => setModalShow(true)} className="cta-btn w-50">
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
