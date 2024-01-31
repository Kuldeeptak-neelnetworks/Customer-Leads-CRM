import searchIcon from "../../assets/search-icon.svg";

const Dashboard = () => {
  return (
    <div className="main-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="page-heading">Dashboard</h2>
        <div className="d-flex justify-content-end align-items-center gap-4 w-35">
          <div className="position-relative w-50">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
            <input
              className="input-field w-100"
              type="text"
              placeholder="Search"
              // value={globalFilter || ""}
              // onChange={(e) => {
              //   setGlobalFilter(e.target.value);
              // }}
            />
          </div>
        </div>
      </div>

      {/* React Table */}
      {/* React Table Footer */}
    </div>
  );
};

export default Dashboard;
