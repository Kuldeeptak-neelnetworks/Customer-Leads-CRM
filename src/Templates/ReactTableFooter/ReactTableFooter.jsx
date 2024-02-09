import { useEffect } from "react";
import { CSVLink } from "react-csv";
import PageSizePopover from "../PageSizePopover/PageSizePopover";
import { DownloadIconSVG } from "../../utils/SVGs/SVGs";
import { isGreaterThan10 } from "../../utils/utilityFunctions/utilityFunctions";

const ReactTableFooter = ({ data, headers, tableInstance }) => {
  const { state, pageOptions, previousPage, nextPage, gotoPage } =
    tableInstance;
  const { pageSize, pageIndex } = state;

  return (
    <div className="react-table_tfoot d-flex justify-content-between align-items-center px-4">
      <div className="d-flex justfy-content-center align-items-center gap-2">
        <span
          className={`${pageIndex !== 0 && "cursor-pointer"}`}
          onClick={() => previousPage()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="-4 0 12 12"
            fill="none"
            className={`previousPageSVGIcon ${
              pageIndex !== 0 ? "allow" : "not-allow"
            }`}
          >
            <path
              d="M5.3718 0.989075L1.17334 5.18761L5.3718 9.38606"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="gotoPage-input-field-wrapper">
          <input
            className="gotoPage-input-field"
            type="number"
            value={isGreaterThan10(pageIndex + 1)}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <span className="">/</span>
        <span className="">{isGreaterThan10(pageOptions.length)}</span>
        <span
          className={`${
            pageIndex + 1 !== pageOptions?.length && "cursor-pointer"
          }`}
          onClick={() => nextPage()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            className={`nextPageSVGIcon ${
              pageIndex + 1 === pageOptions?.length ? "not-allow" : "allow"
            }`}
          >
            <path
              d="M1.25174 9.38605L5.4502 5.18752L1.25174 0.989059"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <span className="">Rows /page</span>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="gotoPage-input-field-wrapper">
            <input
              className="gotoPage-input-field"
              type="number"
              value={isGreaterThan10(pageSize)}
              readOnly
            />
            {/* {pageSize} */}
          </span>
          <span>
            <PageSizePopover tableInstance={tableInstance} />
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <span>Download List</span>
        <span className="download-icon-svg-parent-wrapper">
          <CSVLink
            data={data}
            headers={headers?.headings}
            filename={`${headers?.fileName}.csv`}
          >
            <span className="download-icon-svg-wrapper">
              <DownloadIconSVG cssClass={"download-icon-svg"} />
            </span>
          </CSVLink>
        </span>
      </div>
    </div>
  );
};

export default ReactTableFooter;
