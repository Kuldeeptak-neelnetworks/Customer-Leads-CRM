import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-signup-wrapper">
      <form className="w-25">
        <h2>Login</h2>
        <div className="group">
          <label>Email</label>
          <input />
        </div>
        <div className="group">
          <label>Password</label>
          <input />
        </div>
        <p className="note text-end w-100">
          Don't have an account? <Link to="/signup">Register Now!</Link>
        </p>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
