import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";
import { Tooltip } from "react-tooltip";

import ReactSkeletonTable from "../../Templates/ReactSkeletonTable/ReactSkeletonTable";
import ReactTable from "../../Templates/ReactTable/ReactTable";
import { AddNewLead } from "./AddNewLead";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import PageHeader from "../../Templates/PageHeader/PageHeader";
import { DeleteIconSVG, EditIconSVG, PlusIconSVG } from "../../utils/SVGs/SVGs";
import ReactTableFooter from "../../Templates/ReactTableFooter/ReactTableFooter";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const navigate = useNavigate();
  const {
    initialState,
    getAllLeads,
    getAllCustomers,
    getMyCustomers,
    getMyLeads,
  } = useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);
  const [leads, setLeads] = useState({
    confirmedLeads: [],
    notConfirmedLeads: [],
  });
  const [toggle, setToggle] = useState(true);

  const columnHeaders = ["Sr no.", "Name", "Company", "Actions"];
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  // constructing headers for CSV Link
  const headers = {
    headings: [
      { label: "Name", key: "contact_name" },
      { label: "Company", key: "company_name" },
    ],
    fileName: "Leads",
  };

  useEffect(() => {
    if (userRole === 1) {
      getAllLeads();
      getAllCustomers();
    } else {
      getMyLeads();
      getMyCustomers();
    }
  }, [isUpdated]);

  useEffect(() => {
    const isUserAdmin = userRole === 1;

    const filterLeads = (leads, status) =>
      leads.filter(({ status: leadStatus }) => leadStatus === status);

    const leadsConfirmed = filterLeads(
      isUserAdmin ? initialState.leads : initialState.myLeads,
      "sell"
    );

    const leadsNotConfirmed = filterLeads(
      isUserAdmin ? initialState.leads : initialState.myLeads,
      "not_sell"
    );

    setLeads({
      confirmedLeads: leadsConfirmed,
      notConfirmedLeads: leadsNotConfirmed,
    });
  }, [userRole, initialState.leads, initialState.myLeads]);

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "sr no.",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Name",
      accessor: "contact_name",
    },
    {
      Header: "Company",
      accessor: "company_name",
    },
    {
      Header: "Representative",
      Cell: ({ row }) => {
        const profilePic = row.original?.rep_pic;
        const imgUrl = profilePic
          ? `https://crm.neelnetworks.org/${profilePic}`
          : "https://neelnetworks.org/dummy.jpg";
        return (
          <>
            <img src={imgUrl} alt="profile-image" className="profile-image" />
            <span className="mx-4">{row.original.rep_name}</span>
          </>
        );
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="table-actions-wrapper d-flex justify-content-center align-items-center">
          {userRole === 1 ? (
            <>
              <Tooltip
                id="show-lead-tooltip"
                style={{
                  background: "#000",
                  color: "#fff",
                }}
                opacity={0.9}
              />
              <div
                data-tooltip-id="show-lead-tooltip"
                data-tooltip-content="Check Lead Details"
                data-tooltip-place="top"
                onClick={() => navigate(`/leads/${row.original?.id}`)}
                className="cursor-pointer table-actions-icon-wrapper"
              >
                <PlusIconSVG />
              </div>
            </>
          ) : (
            <>
              <Tooltip
                id="edit-lead-tooltip"
                style={{
                  background: "#000",
                  color: "#fff",
                }}
                opacity={0.9}
              />
              <div
                data-tooltip-id="edit-lead-tooltip"
                data-tooltip-content="Edit Lead Details"
                data-tooltip-place="top"
                onClick={() => navigate(`/leads/${row.original?.id}`)}
                className="cursor-pointer table-actions-icon-wrapper"
              >
                <EditIconSVG />
              </div>
              <span style={{ color: "#00263d38" }}>|</span>
              <div className="table-actions-icon-wrapper">
                <DeleteIconSVG />
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(
    () => (toggle ? leads.confirmedLeads : leads.notConfirmedLeads),
    [toggle, leads.confirmedLeads, leads.notConfirmedLeads]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const showLoading =
    initialState.isLoading &&
    (userRole === 1
      ? initialState.leads.length <= 0
      : initialState.myLeads.length <= 0);

  return (
    <div className="main-wrapper">
      <PageHeader heading={"Leads"} tableInstance={tableInstance}>
        {userRole !== 1 && (
          <AddNewLead
            setIsUpdated={setIsUpdated}
            customers={
              userRole === 1 ? initialState.customers : initialState.myCustomers
            }
          />
        )}
      </PageHeader>

      <section className="mt-4 mb-3">
        <div className="d-flex gap-4">
          <button
            onClick={() => setToggle(true)}
            className={`leads-tab-link ${toggle && "active"}`}
          >
            Confirmed Leads
          </button>
          <button
            onClick={() => setToggle(false)}
            className={`leads-tab-link ${!toggle && "active"}`}
          >
            Not Confirmed Leads
          </button>
        </div>
      </section>

      {showLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : (
          toggle
            ? leads?.confirmedLeads?.length > 0
            : leads?.notConfirmedLeads?.length > 0
        ) ? (
        <>
          <ReactTable tableInstance={tableInstance} />
          <ReactTableFooter
            data={toggle ? leads.confirmedLeads : leads.notConfirmedLeads}
            tableInstance={tableInstance}
            headers={headers}
          />
        </>
      ) : (
        <p className="m-0">No Leads Found!</p>
      )}
    </div>
  );
};

export default Leads;
