import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header w-100 d-flex justify-content-between align-items-center">
      <img onClick={() => navigate("/dashboard")} src={logo} alt="logo" />
      <div className="d-flex gap-4 align-items-center">
        <NavLink to="/profile">Profile</NavLink>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
