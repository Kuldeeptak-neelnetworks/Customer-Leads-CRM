import { NotificationIconSVG } from "../../utils/SVGs/SVGs";
import HeaderPopover from "./HeaderPopover";

const Header = () => {
  const username = JSON.parse(localStorage.getItem("user"))?.name;

  const capitalUserName = (username) =>
    username.slice(0, 1).toUpperCase().concat(username.slice(1)) ?? "";

  return (
    <div className="header w-100 d-flex justify-content-end align-items-center">
      <div className="d-flex align-items-center gap-3">
        <p className="m-0 username">{capitalUserName(username)}</p>
        <div className="header-icon">
          <HeaderPopover />
        </div>
        <div className="header-icon notifications active">
          <NotificationIconSVG />
        </div>
      </div>
    </div>
  );
};

export default Header;
