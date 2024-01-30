import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const PageSizePopover = ({ tableInstance }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { setPageSize } = tableInstance;

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div ref={ref} className="header-popover">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="-5 0 12 12"
        fill="none"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <path
          opacity="0.95"
          d="M1.25174 9.38605L5.4502 5.18752L1.25174 0.989059"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref}
        containerPadding={20}
        rootClose={true}
        rootCloseEvent={"click"}
        onHide={() => setShow(!show)}
        bsPrefix="header-popover width-100"
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            <div className="page-size-popover d-flex flex-column align-items-center gap-1 cursor-pointer">
              <span
                onClick={() => {
                  setShow(!show);
                  setPageSize(5);
                }}
              >
                5 rows
              </span>
              <span
                onClick={() => {
                  setShow(!show);
                  setPageSize(10);
                }}
              >
                10 rows
              </span>
              <span
                onClick={() => {
                  setShow(!show);
                  setPageSize(50);
                }}
              >
                50 rows
              </span>
              <span
                onClick={() => {
                  setShow(!show);
                  setPageSize(100);
                }}
              >
                100 rows
              </span>
            </div>
          </Popover.Header>
        </Popover>
      </Overlay>
    </div>
  );
};

export default PageSizePopover;
