import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  return (
    <div className="sidebar d-flex flex-column">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/leads">Leads</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      {userRole === 1 && <NavLink to="/users">Users</NavLink>}
    </div>
  );
};

export default Sidebar;
