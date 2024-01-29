import { NotificationIconSVG } from "../../utils/SVGs/SVGs";
import HeaderPopover from "./HeaderPopover";

const Header = () => {
  return (
    <div className="header w-100 d-flex justify-content-end align-items-center">
      <div className="d-flex align-items-center gap-3">
        <p className="m-0 username">Deven</p>
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
