import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

const NewLogin = () => {
  return (
    <div className="bg-wrapper">
      <div className="content-parent">
        <div className="text-center">
          <img src={avatar} alt="avatar" />
          <h2 className="login-heading">Welcome</h2>
        </div>
        <form className="login-form">
          <div className="group mb-4">
            <label>Username</label>
            <input type="email" />
          </div>
          <div className="group mb-2">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="text-end mb-2">
            <Link className="link">Forgot Password?</Link>
          </div>
          <button className="w-100 login-btn">LOGIN</button>
        </form>
        <img className="pt-5 w-100" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NewLogin;
