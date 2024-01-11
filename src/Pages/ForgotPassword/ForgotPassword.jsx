/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="login-wrapper">
      <form className="w-25">
        <h2>Forgot Password</h2>
        <div className="group">
          <label>Email</label>
          <input />
        </div>
        <p className="note text-end w-100">
          <Link to="/">Back to Login?</Link>
        </p>
        <button>Forgot Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
