import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl } from "../../utils/Constants/constants";
import { EyeIconSVG, EyeIconDisabledSVG } from "../../utils/SVGs/SVGs";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if token is available then redirecting user to dashboard page
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, []);

  const [user, setUser] = useState({
    email: "hem@gmail.com",
    password: "hemant",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    try {
      setIsDisabled(true);
      const url = `${apiUrl}/login`;
      const result = await axios.post(url, user);

      if (result.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify(result.data.user_data.token)
        );
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user_data.user)
        );
        ReactHotToast(result.data.message, "success");
        navigate("/dashboard");
      }
    } catch (e) {
      ReactHotToast(e.response.data.message, "error");
    } finally {
      setIsDisabled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      handleLogin();
    } else {
      ReactHotToast("Enter Email & Password!", "error");
    }
  };

  return (
    <div className="bg-wrapper">
      <div className="content-parent">
        <div className="text-center">
          <img src={avatar} alt="avatar" />
          <h2 className="login-heading">Welcome</h2>
        </div>
        <div className="pt-3">
          <h4 className="page-title">Login</h4>
          <p className="m-0 page-text pt-1 pb-3">
            Enter your Email Id & password
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="group mb-4">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="group mb-2">
            <label htmlFor="password">Password</label>
            <div className="w-100 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
                autoComplete="off"
                className="position-relative w-100"
                style={{ paddingRight: "40px" }}
              />
              {showPassword ? (
                <div onClick={togglePassword}>
                  <EyeIconSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              ) : (
                <div onClick={togglePassword}>
                  <EyeIconDisabledSVG
                    cssClass={"position-absolute password-eye-icon"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-end mb-2">
            <Link to="/forgot-password" className="link">
              Forgot Password?
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

export default Login;
