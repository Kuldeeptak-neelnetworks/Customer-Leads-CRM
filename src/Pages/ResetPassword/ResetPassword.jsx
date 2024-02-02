import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl } from "../../utils/Constants/constants";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { EyeIconDisabledSVG, EyeIconSVG } from "../../utils/SVGs/SVGs";

const ResetPassword = () => {
  const navigate = useNavigate();

  // if token is available then redirecting user to dashboard page
  if (localStorage.getItem("token")) navigate("/dashboard");

  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const togglePassword = (element) => {
    setShowPassword((prev) => ({
      ...prev,
      [element]: !prev[element],
    }));
  };

  const handlePassword = (e) => {
    const { id, value } = e.target;
    setResetPassword((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log("reset password: ", resetPassword);
  };

  return (
    <div className="bg-wrapper">
      <div className="content-parent">
        <div className="text-center">
          <img src={avatar} alt="avatar" />
          <h2 className="login-heading">Welcome</h2>
        </div>
        <div className="pt-3">
          <h4 className="page-title">Reset Password</h4>
          <p className="m-0 page-text pt-1 pb-3">
            Enter a new password & confirm password
          </p>
        </div>
        <form className="login-form" onSubmit={handleResetPassword}>
          <div className="group mb-2">
            <label htmlFor="password">Password</label>
            <div className="w-100 position-relative">
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                className="position-relative w-100"
                value={resetPassword.password}
                onChange={(e) => handlePassword(e)}
                required
              />
              {showPassword.password ? (
                <div onClick={() => togglePassword("password")}>
                  <EyeIconSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              ) : (
                <div onClick={() => togglePassword("password")}>
                  <EyeIconDisabledSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="group mb-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="w-100 position-relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="position-relative w-100"
                value={resetPassword.confirmPassword}
                onChange={(e) => handlePassword(e)}
                required
              />
              {showPassword.confirmPassword ? (
                <div onClick={() => togglePassword("confirmPassword")}>
                  <EyeIconSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              ) : (
                <div onClick={() => togglePassword("confirmPassword")}>
                  <EyeIconDisabledSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              )}
            </div>
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
            {isDisabled ? <SpinningLoader /> : "SUBMIT"}
          </button>
        </form>
        <img className="pt-5 w-100" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default ResetPassword;
