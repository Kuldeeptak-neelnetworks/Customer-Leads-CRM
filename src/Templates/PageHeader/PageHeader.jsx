import searchIcon from "../../assets/search-icon.svg";

const PageHeader = ({ heading, tableInstance, children }) => {
  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="page-heading">{heading}</h2>
      <div className="d-flex justify-content-end align-items-center gap-4 w-35">
        <div className="position-relative w-50">
          <img className="search-icon" src={searchIcon} alt="search-icon" />
          <input
            className="input-field w-100"
            type="text"
            placeholder="Search"
            value={globalFilter || ""}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
