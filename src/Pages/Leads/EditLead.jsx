import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";
import { ContextMain } from "../../Context/MainContext";
import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";
import axios from "axios";

const EditLead = () => {
  const { leadId } = useParams();
  const { initialState, getAllLeads, getAllCustomers, getMyLeads } =
    useContext(ContextMain);

  const [isDisabled, setIsDisabled] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    url: "",
    notes: "",
    status: false,
    customerId: "",
  });
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  useEffect(() => {
    if (userRole === 1) {
      getAllLeads();
    } else {
      getMyLeads();
    }

    getAllCustomers();
  }, []);

  useEffect(() => {
    const leadsDataset =
      userRole === 1 ? initialState?.leads : initialState?.myLeads;
    const findLead = leadsDataset.find(({ id }) => id === +leadId);

    const customersDataset = initialState.customers;

    const findCustomer = customersDataset.find(
      ({ id }) => id === findLead?.customer_id
    );

    setLead({
      customerId: findCustomer?.id,
      name: findCustomer?.contact_name,
      company: findCustomer?.company_name,
      email: findCustomer?.email_address,
      contact: findCustomer?.mobile_no,
      status: findLead?.status === "sell" ? true : false,
      url: findLead?.Urls,
      notes: findLead?.notes,
    });
  }, [
    initialState.leads,
    initialState.myLeads,
    initialState.customers,
    leadId,
    userRole,
  ]);

  const editLead = async (event) => {
    try {
      setIsDisabled(true);

      const formData = new FormData(event.currentTarget);
      formData.append("customer", lead.customerId);
      formData.append("url", lead.url ?? "");
      formData.append("is_for_sale", lead.status ? 1 : 2);
      formData.append("notes", lead.notes ?? "");
      formData.append("lead", leadId);

      const url = `${apiUrl}/leads?_method=PUT`;
      const result = await axios.post(url, formData, {
        headers: headerOptions(true),
      });

      if (result.status === 200) {
        ReactHotToast(result.data.message, "success");
      }
    } catch (e) {
      Object.values(e.response.data.error).forEach((error) =>
        ReactHotToast(error, "error")
      );
    } finally {
      setIsDisabled(false);
    }
  };

  const handleEditLead = (e) => {
    e.preventDefault();
    editLead(e);
  };

  return (
    <div className="main-wrapper">
      <h2 className="page-heading">
        {userRole === 1 ? "Lead Details" : "Edit Lead"}
      </h2>
      <form
        onSubmit={handleEditLead}
        className="d-flex flex-column gap-3 mt-4 m-auto justify-content-center align-items-center w-25"
      >
        <div className="group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={lead.name} disabled readOnly />
        </div>
        <div className="group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={lead.company}
            disabled
            readOnly
          />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={lead.email} disabled readOnly />
        </div>
        <div className="group">
          <label htmlFor="contact">Mobile</label>
          <input
            type="tel"
            id="contact"
            value={lead.contact}
            disabled
            readOnly
          />
        </div>
        <div className="group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={lead.url}
            onChange={(e) =>
              setLead((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
            disabled={userRole === 1}
            readOnly={userRole === 1}
          />
        </div>
        <div className="group">
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            id="notes"
            value={lead.notes}
            onChange={(e) =>
              setLead((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            disabled={userRole === 1}
            readOnly={userRole === 1}
          />
        </div>
        <div className="group d-flex flex-row gap-2 mt-1 justify-content-start align-items-center">
          <label htmlFor="status" className="py-0">
            Confirmed Customer Status
          </label>
          <input
            type="checkbox"
            id="status"
            onChange={(e) => {
              if (userRole !== 1) {
                setLead((prev) => ({
                  ...prev,
                  status: !prev.status,
                }));
              }
            }}
            checked={lead.status}
            readOnly={userRole === 1}
            style={{ cursor: `${userRole === 1 ? "not-allowed" : "pointer"}` }}
          />
        </div>

        {userRole !== 1 && (
          <button type="submit" className="cta-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Edit Lead"}
          </button>
        )}
      </form>
    </div>
  );
};

export default EditLead;
