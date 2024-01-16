import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";

const MyVerticallyCenteredModal = ({ show, onHide, setIsUpdated }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userRoles: "",
    contact_no: "",
    address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const addNewUser = async () => {
    try {
      setIsDisabled(true);
      const url = `${apiUrl}/add/user`;
      const result = await axios.post(url, user, { headers: headerOptions() });

      console.log("result add new user: ", result);
      if (result.status === 201) {
        ReactHotToast(result.data.message, "success");
        onHide();
        setIsUpdated((prev) => !prev);
        setUser({
          name: "",
          email: "",
          password: "",
          userRoles: "",
          contact_no: "",
          address: "",
        });
      }
    } catch (e) {
      ReactHotToast(e.response.data.message, "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddNewUser = (e) => {
    e.preventDefault();
    const bool = [
      user.name,
      user.email,
      user.password,
      user.userRoles,
      user.contact_no,
      user.address,
    ].every(Boolean);

    if (bool) {
      addNewUser();
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
            {/* <img src={projectsIcon} height={20} width={20} alt="user-icon" /> */}
            <span className="modal-title">New User</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form
          onSubmit={handleAddNewUser}
          className="d-flex flex-column gap-2 justify-content-center align-items-center"
        >
          <div className="group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="userRoles">User Role</label>
            <select
              id="userRoles"
              value={user.userRoles}
              onChange={(e) => handleChange(e)}
            >
              <option>Select User Role</option>
              <option value="1">Admin</option>
              <option value="2">Employee</option>
              <option value="3">SalesPerson</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="contact_no">Contact</label>
            <input
              type="tel"
              id="contact_no"
              value={user.contact_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={user.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button type="submit" className="custom-btn" disabled={isDisabled}>
            {/* {isLoading ? <SpinningLoader /> : "Add Project"} */}
            Add
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const AddNewUser = ({ setIsUpdated }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setModalShow(true);
        }}
      >
        <button className="add-new-btn">Add New User</button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsUpdated={setIsUpdated}
      />
    </>
  );
};
