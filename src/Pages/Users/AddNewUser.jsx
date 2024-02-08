import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";
import {
  EyeIconDisabledSVG,
  EyeIconSVG,
  PlusIconSVG,
} from "../../utils/SVGs/SVGs";

const MyVerticallyCenteredModal = ({ show, onHide, setIsUpdated }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userRoles: "",
    contact_no: "",
    address: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const addNewUser = async (event) => {
    try {
      setIsDisabled(true);

      const formData = new FormData(event.currentTarget);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("userRoles", user.userRoles);
      formData.append("contact_no", user.contact_no);
      formData.append("address", user.address);
      formData.append("profile_pic", user.profilePic ? user.profilePic : "");

      const url = `${apiUrl}/add/user`;
      const result = await axios.post(url, formData, {
        headers: headerOptions(true),
      });

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
          profilePic: "",
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

  const handleAddNewUser = (e) => {
    e.preventDefault();
    const { name, email, password, userRoles, contact_no, address } = user;

    const bool = [name, email, password, userRoles, contact_no, address].every(
      Boolean
    );

    if (bool) {
      addNewUser(e);
    } else {
      const conditions = {
        [!name]: "Please input User Name!",
        [!email]: "Please input User Email!",
        [!password]: "Please input User Password!",
        [!userRoles]: "Please select User Role!",
        [!contact_no]: "Please add Contact Info!",
        [!address]: "Please provide Address",
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
          New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleAddNewUser}
          className="d-flex flex-column gap-3 justify-content-center align-items-center"
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
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="position-relative w-100"
                id="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
              {showPassword ? (
                <div onClick={() => setShowPassword((prev) => !prev)}>
                  <EyeIconSVG
                    cssClass={
                      "position-absolute password-eye-icon not-login-form"
                    }
                  />
                </div>
              ) : (
                <div onClick={() => setShowPassword((prev) => !prev)}>
                  <EyeIconDisabledSVG
                    cssClass={
                      "position-absolute password-eye-icon not-login-form"
                    }
                  />
                </div>
              )}
            </div>
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
              {/* <option value="2">Employee</option> */}
              <option value="3">SalesPerson</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="contact_no">Contact</label>
            <input
              type="number"
              id="contact_no"
              value={user.contact_no}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              id="address"
              value={user.address}
              onChange={(e) => handleChange(e)}
              rows={3}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="profilePic">Profile Picture (optional)</label>
            <input
              type="file"
              id="profilePic"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, profilePic: e.target.files[0] }))
              }
            />
          </div>

          <button type="submit" className="cta-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Add New User"}
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
      <button onClick={() => setModalShow(true)} className="cta-btn w-50">
        Add New User
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
