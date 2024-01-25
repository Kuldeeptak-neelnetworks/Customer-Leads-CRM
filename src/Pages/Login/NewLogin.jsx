import logo from "../../assets/logo.png";

const NewLogin = () => {
  return (
    <div className="bg-wrapper">
      <div className="content-parent">
        <div className=""></div>
        <form>
          <div>
            <label>Username</label>
            <input />
          </div>
          <div>
            <label>Password</label>
            <input />
          </div>
          <p>Forgot Password?</p>
          <button>LOGIN</button>
        </form>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default NewLogin;
