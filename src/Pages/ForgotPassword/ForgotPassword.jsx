import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl } from "../../utils/Constants/constants";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // if token is available then redirecting user to dashboard page
  if (localStorage.getItem("token")) navigate("/dashboard");

  const [user, setUser] = useState({
    email: "hem@gmail.com",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="bg-wrapper">
      <div className="content-parent">
        <div className="text-center">
          <img src={avatar} alt="avatar" />
          <h2 className="login-heading">Welcome</h2>
        </div>
        <div className="pt-3">
          <h4 className="page-title">Forgot Password</h4>
          <p className="m-0 page-text pt-1 pb-3">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>
        <form className="login-form">
          <div className="group mb-2">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              // value={user.email}
              // onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="text-end mb-2">
            <Link to="/" className="link">
              Go Back to Login?
            </Link>
          </div>
          <button
            className="w-100 login-btn d-flex justify-content-center align-items-center"
            disabled={isDisabled}
          >
            {isDisabled ? <SpinningLoader /> : "LOGIN"}
          </button>
        </form>
        <img className="pt-5 w-100" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default ForgotPassword;
