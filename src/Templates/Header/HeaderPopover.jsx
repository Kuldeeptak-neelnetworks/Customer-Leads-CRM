import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";

import { ProfileIconSVG } from "../../utils/SVGs/SVGs";

const HeaderPopover = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div ref={ref} className="header-popover">
      <div onClick={handleClick} style={{ marginTop: "-3px" }}>
        <ProfileIconSVG />
      </div>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
        rootClose={true}
        rootCloseEvent={"click"}
        onHide={() => setShow(!show)}
        bsPrefix="header-popover"
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            <div
              onClick={() => {
                navigate("/profile");
                setShow(!show);
              }}
              className="text-center cursor-pointer"
            >
              <span className="header-link">Profile</span>
            </div>
          </Popover.Header>
          <Popover.Header as="h3">
            <div onClick={handleLogout} className="text-center cursor-pointer">
              <span className="header-link">Log out</span>
            </div>
          </Popover.Header>
        </Popover>
      </Overlay>
    </div>
  );
};

export default HeaderPopover;
