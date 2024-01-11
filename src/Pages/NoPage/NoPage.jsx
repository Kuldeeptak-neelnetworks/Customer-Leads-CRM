import { NavLink } from "react-router-dom";

const NoPage = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="no-page-wrapper">
      <h2>No Page Found!</h2>
      <NavLink to={`${token ? "/dashboard" : "/"}`}>
        Go back to {token ? "Dashboard" : "Login"}
      </NavLink>
    </div>
  );
};

export default NoPage;
