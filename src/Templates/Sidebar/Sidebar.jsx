import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/leads">Leads</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      <NavLink to="/users">Users</NavLink>
    </div>
  );
};

export default Sidebar;
