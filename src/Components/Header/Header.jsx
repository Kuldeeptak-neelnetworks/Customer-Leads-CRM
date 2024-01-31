import { NotificationIconSVG } from "../../utils/SVGs/SVGs";
import HeaderPopover from "./HeaderPopover";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileImageUrl = user.profile_picture
    ? `https://crm.neelnetworks.org/${user.profile_picture}`
    : "https://neelnetworks.org/dummy.jpg";

  const capitalUserName = (username) =>
    username.slice(0, 1).toUpperCase().concat(username.slice(1)) ?? "";

  return (
    <div className="header w-100 d-flex justify-content-end align-items-center">
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex gap-4 align-items-center">
          <img
            src={profileImageUrl}
            alt="profile-image"
            className="profile-image"
          />
          <p className="m-0 username">{capitalUserName(user.name)}</p>
        </div>
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
