import { useContext, useEffect } from "react";
import { ContextMain } from "../../Context/MainContext";

const Dashboard = () => {
  const {
    initialState,
    getAllLeads,
    getAllCustomers,
    getMyLeads,
    getAllUsers,
  } = useContext(ContextMain);
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  useEffect(() => {
    if (userRole === 1) {
      getAllLeads();
      getAllUsers();
    } else {
      getMyLeads();
    }

    getAllCustomers();
  }, []);

  const blockData = (data) => [...data].reverse();

  return (
    <div className="main-wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="page-heading">Dashboard</h2>
      </div>

      <section className="mt-4 mb-3 d-flex justify-content-center flex-wrap">
        {/* New Leads */}
        <div className="dashboard-block">
          <h4>Latest Leads</h4>
          {(
            userRole === 1
              ? initialState?.leads?.length > 0
              : initialState?.myLeads?.length > 0
          ) ? (
            <ul className="block-data-wrapper mt-5">
              {blockData(
                userRole === 1 ? initialState?.leads : initialState?.myLeads
              )?.map((lead) => (
                <li key={lead.id}>
                  <p>
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
          {initialState?.customers?.length > 0 ? (
            <ul className="block-data-wrapper mt-5">
              {blockData(initialState?.customers)?.map((customer) => (
                <li key={customer.id}>
                  <p>
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
            {initialState?.users?.length > 0 ? (
              <ul className="block-data-wrapper mt-5">
                {blockData(initialState?.users)
                  ?.filter(({ userRoles }) => userRoles === "SalesPerson")
                  ?.map((user) => (
                    <li key={user.id}>
                      <p>
                        <span>Name:</span> {user.name}
                      </p>
                      <p>
                        <span>Email Id:</span> {user.email}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="m-0">No Users Found!</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
