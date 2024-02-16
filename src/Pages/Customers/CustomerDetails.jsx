import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextMain } from "../../Context/MainContext";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const { initialState, getAllCustomers, getMyCustomers } =
    useContext(ContextMain);
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  useEffect(() => {
    if (userRole === 1) {
      getAllCustomers();
    } else {
      getMyCustomers();
    }
  }, []);

  return (
    <div className="main-wrapper">
      <h2 className="page-heading">
        {userRole === 1 ? "Customer Details" : "Edit Customer"}
      </h2>
      {/* customer form & attachments section */}
      <section className="d-flex align-items-start gap-5 mt-5 w-100">
        <form
          //   onSubmit={handleEditLead}
          className="d-flex flex-column gap-3 justify-content-center align-items-center w-25"
        >
          <div className="group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>
          <div className="group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>
          <div className="group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>
          <div className="group">
            <label htmlFor="contact">Mobile</label>
            <input
              type="number"
              id="contact"
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>
          <div className="group">
            <label htmlFor="landline">Landline</label>
            <input
              type="number"
              id="landline"
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>
          <div className="group">
            <label htmlFor="address">Address (optional)</label>
            <textarea
              type="text"
              id="address"
              rows={3}
              disabled={userRole === 1}
              readOnly={userRole === 1}
            />
          </div>

          {userRole !== 1 && (
            <button type="submit" className="cta-btn">
              {/* {isDisabled ? <SpinningLoader /> : "Edit Lead"} */}
              Edit Customer
            </button>
          )}
        </form>
        <div className="customer-attachments w-75">
          <h4 className="page-heading mb-3">Attachments (2)</h4>
          <div className="attachment">
            <p>Client-101-Invoice.pdf</p>
            <button className="cta-btn">Download</button>
          </div>
          <div className="attachment">
            <p>Reports.xls</p>
            <button className="cta-btn">Download</button>
          </div>
        </div>
      </section>
      {/* email section */}
      <section></section>
    </div>
  );
};

export default CustomerDetails;
