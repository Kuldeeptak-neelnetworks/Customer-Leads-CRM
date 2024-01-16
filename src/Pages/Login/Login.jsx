import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl } from "../../utils/Constants/constants";

const Login = () => {
  const navigate = useNavigate();

  // if token is available then redirecting user to dashboard page
  if (localStorage.getItem("token")) navigate("/dashboard");

  const [user, setUser] = useState({
    email: "hem@gmail.com",
    password: "hemant",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    try {
      setIsDisabled(true);
      const url = `${apiUrl}/login`;
      const result = await axios.post(url, user);

      console.log("result: ", result);
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
    <div className="login-wrapper">
      <img src={logo} alt="logo" />
      <form className="w-25" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            required
            autoComplete="off"
          />
        </div>
        <p className="note text-end w-100">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <button type="submit" disabled={isDisabled}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
