import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextMain } from "../../Context/MainContext";
import { AddNewAttachment } from "./AddNewAttachment";
import { clientsEmailCommunication } from "../../utils/Constants/constants";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { initialState, getAllCustomers, getMyCustomers } =
    useContext(ContextMain);
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;
  const [customer, setCustomer] = useState({});
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: "Client-101-Invoice.pdf",
    },
    {
      id: 2,
      name: "Reports.xls",
    },
  ]);

  // calling customers or my-customers api
  useEffect(() => {
    if (userRole === 1) {
      getAllCustomers();
    } else {
      getMyCustomers();
    }
  }, [userRole]);

  // filtering customer details & setting it in customer state
  useEffect(() => {
    const filterData = (dataset) => {
      const filteredCustomer = dataset?.find(
        (customerData) => +customerData.id === +customerId
      );

      setCustomer({
        name: filteredCustomer?.contact_name,
        company: filteredCustomer?.company_name,
        email: filteredCustomer?.email_address,
        mobile: filteredCustomer?.mobile_no,
        landline: filteredCustomer?.phone_no,
        address: filteredCustomer?.address,
      });
    };

    if (userRole === 1) {
      filterData(initialState.customers);
    } else {
      filterData(initialState.myCustomers);
    }
  }, [initialState.customers, initialState.myCustomers, userRole, customerId]);

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
          {/* name */}
          <div className="group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.name ?? ""}
            />
          </div>
          {/* company name */}
          <div className="group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.company ?? ""}
            />
          </div>
          {/* email id */}
          <div className="group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.email ?? ""}
            />
          </div>
          {/* mobile */}
          <div className="group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="number"
              id="mobile"
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.mobile ?? ""}
            />
          </div>
          {/* landline */}
          <div className="group">
            <label htmlFor="landline">Landline</label>
            <input
              type="number"
              id="landline"
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.landline ?? ""}
            />
          </div>
          {/* address */}
          <div className="group">
            <label htmlFor="address">Address (optional)</label>
            <textarea
              type="text"
              id="address"
              rows={3}
              disabled={userRole === 1}
              readOnly={userRole === 1}
              value={customer?.address ?? ""}
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
          <div className="d-flex justify-content-between align-item-center mb-5">
            <h4 className="page-heading m-0">
              Attachments ({attachments.length})
            </h4>
            <AddNewAttachment
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </div>
          {attachments.map((attachment) => (
            <div key={attachment.id} className="attachment">
              <p>{attachment.name}</p>
              <button className="cta-btn">Download</button>
            </div>
          ))}
        </div>
      </section>
      {/* email section */}
      <section>
        <h4 className="page-heading mt-5">Email Communications</h4>
        <div className="d-flex gap-2 mt-4">
          <div className="email-communication-list-wrapper w-100">
            {clientsEmailCommunication.list.map((email) => (
              <div
                className="communication d-flex align-items-center justify-content-between gap-3"
                key={email.id}
                onClick={() =>
                  navigate(`/customers/${customerId}/emails/${email.id}`, {
                    state: {
                      email,
                      customer,
                    },
                  })
                }
              >
                <p className="m-0 content-text">{customer.name}</p>
                <p className="m-0 content-text">{email.subject}</p>
                <p className="m-0 content-text">
                  {email.time}, {email.date}
                </p>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default CustomerDetails;
