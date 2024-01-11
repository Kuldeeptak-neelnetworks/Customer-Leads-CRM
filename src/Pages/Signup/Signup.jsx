import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="login-signup-wrapper">
      <form className="w-25">
        <h2 className="text-center">Signup</h2>
        <div className="group">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="group">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="group">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="group">
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <p className="note text-end w-100">
          Already have an account? <Link to="/">Login Now!</Link>
        </p>
        <button>SIgnup</button>
      </form>
    </div>
  );
};

export default Signup;
