import { useContext, useEffect, useMemo } from "react";
import { ContextMain } from "../../Context/MainContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    initialState,
    getAllLeads,
    getMyCustomers,
    getAllCustomers,
    getMyLeads,
    getAllUsers,
  } = useContext(ContextMain);
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === 1) {
      getAllLeads();
      getAllUsers();
      getAllCustomers();
    } else {
      getMyLeads();
      getMyCustomers();
    }
  }, []);

  const blockData = (data) => [...data].reverse().slice(0, 5);

  const leadsFound = useMemo(
    () =>
      userRole === 1
        ? initialState?.leads?.length > 0
        : initialState?.myLeads?.length > 0,
    [initialState.leads, initialState.myLeads, userRole]
  );

  const customersFound = useMemo(
    () =>
      userRole === 1
        ? initialState?.customers?.length > 0
        : initialState?.myCustomers?.length > 0,
    [initialState.customers, initialState.myCustomers, userRole]
  );
  return (
    <div className="main-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="page-heading">Dashboard</h2>
      </div>

      <section className="mt-4 mb-3 d-flex justify-content-center flex-wrap">
        {/* New Leads */}
        <div className="dashboard-block">
          <h4>Latest Leads</h4>
          {initialState.isLoading ? (
            <p className="m-0">Loading Leads!</p>
          ) : leadsFound ? (
            <ul className="block-data-wrapper mt-5">
              {blockData(
                userRole === 1 ? initialState?.leads : initialState?.myLeads
              )?.map((lead) => (
                <li key={lead.id}>
                  <p
                    onClick={() => navigate(`/leads/${lead.id}`)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    <span>Name:</span> {lead.contact_name}
                  </p>
                  <p>
                    <span>Company:</span> {lead.company_name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0">No Leads Found!</p>
          )}
        </div>
        {/* New Customers */}
        <div
          className={`dashboard-block before ${userRole === 1 ? "after" : ""}`}
        >
          <h4>New Customers</h4>
          {initialState.isLoading ? (
            <p className="m-0">Loading Customers!</p>
          ) : customersFound ? (
            <ul className="block-data-wrapper mt-5">
              {blockData(
                userRole === 1
                  ? initialState?.customers
                  : initialState?.myCustomers
              )?.map((customer) => (
                <li key={customer.id}>
                  <p
                    onClick={() => navigate(`/customers`)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    <span>Name:</span> {customer.contact_name}
                  </p>
                  <p>
                    <span>Company:</span> {customer.company_name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0">No Customers Found!</p>
          )}
        </div>
        {/* New Salespersons */}
        {userRole === 1 && (
          <div className="dashboard-block">
            <h4>New Salespersons</h4>
            {initialState.isLoading ? (
              <p className="m-0">Loading Salespersons!</p>
            ) : initialState?.users?.length > 0 ? (
              <ul className="block-data-wrapper mt-5">
                {blockData(
                  initialState?.users.filter(
                    ({ userRoles }) => userRoles === "SalesPerson"
                  )
                )?.map((user) => (
                  <li key={user.id}>
                    <p
                      onClick={() => navigate(`/users`)}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      <span>Name:</span> {user.name}
                    </p>
                    <p>
                      <span>Email Id:</span> {user.email}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0">No Salesperson Found!</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
