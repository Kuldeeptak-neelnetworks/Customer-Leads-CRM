import { NavLink, useNavigate } from "react-router-dom";
import {
  SidebarOpenCloseSVG,
  HomeIconSVG,
  FilesIconSVG,
  GroupOfUsersIconSVG,
  HandshakeIconSVG,
} from "../../utils/SVGs/SVGs";
import logo from "../../assets/logo.png";
import logoIcon from "../../assets/logo-icon.png";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <div
      className={`sidebar ${toggleSidebar ? "" : "close"} d-flex flex-column`}
    >
      <main className="d-flex flex-column justify-content-between">
        <div className="sidebar-wrapper d-flex flex-column">
          <div
            className="sidebar-logo-wrapper"
            onClick={() =>
              navigate(localStorage.getItem("token") ? "/dashboard" : "/")
            }
          >
            <img
              src={toggleSidebar ? logo : logoIcon}
              alt="logo"
              className="cursor-pointer sidebar-logo"
            />
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/dashboard">
              <span className="sidebar-icon">
                <HomeIconSVG cssClass={"sidebar-icon-svg"} />
              </span>
              <span className="sidebar-link-text">Dashboard</span>
            </NavLink>
            <NavLink to="/leads">
              <span className="sidebar-icon">
                <FilesIconSVG cssClass={"sidebar-icon-svg"} />
              </span>
              <span className="sidebar-link-text">Leads</span>
            </NavLink>
            <NavLink to="/customers">
              <span className="sidebar-icon">
                <GroupOfUsersIconSVG cssClass={"sidebar-icon-svg"} />
              </span>
              <span className="sidebar-link-text">Customers</span>
            </NavLink>
            {userRole === 1 && (
              <NavLink to="/users">
                <span className="sidebar-icon">
                  <HandshakeIconSVG cssClass={"sidebar-icon-svg"} />
                </span>
                <span className="sidebar-link-text">Users</span>
              </NavLink>
            )}
          </div>
        </div>
        <div
          className="sidebar-open-close-svg-icon-wrapper"
          style={{ padding: "0px 20px" }}
          onClick={() => setToggleSidebar((prev) => !prev)}
        >
          <SidebarOpenCloseSVG cssClass={"sidebar-open-close-svg-icon"} />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
