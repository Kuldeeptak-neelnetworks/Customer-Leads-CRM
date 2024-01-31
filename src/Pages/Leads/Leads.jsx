import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";

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
import { DeleteIconSVG, EditIconSVG } from "../../utils/SVGs/SVGs";
import ReactTableFooter from "../../Templates/ReactTableFooter/ReactTableFooter";

const Leads = () => {
  const { initialState, getAllLeads, getAllCustomers, getMyLeads } =
    useContext(ContextMain);
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
    } else {
      getMyLeads();
    }
    getAllCustomers();
  }, [isUpdated]);

  // useEffect(() => {
  //   let leadsConfirmed, leadsNotConfirmed;
  //   if (userRole === 1) {
  //     leadsConfirmed = initialState.leads.filter(
  //       ({ status }) => status !== "not_sell"
  //     );
  //     leadsNotConfirmed = initialState.leads.filter(
  //       ({ status }) => status === "not_sell"
  //     );
  //   } else {
  //     leadsConfirmed = initialState.myLeads.filter(
  //       ({ status }) => status !== "not_sell"
  //     );
  //     leadsNotConfirmed = initialState.myLeads.filter(
  //       ({ status }) => status === "not_sell"
  //     );
  //   }

  //   setLeads(() => ({
  //     confirmedLeads: leadsConfirmed,
  //     notConfirmedLeads: leadsNotConfirmed,
  //   }));
  // }, [initialState.leads, initialState.myLeads]);

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
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) =>
        row.original.status === "not_sell"
          ? "Not Confirmed Customer"
          : "Confirmed Customer",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="table-actions-wrapper d-flex justify-content-center align-items-center gap-2">
          <EditIconSVG cssClass={"cursor-pointer"} />
          <span style={{ color: "#00263d38" }}>|</span>
          <DeleteIconSVG cssClass={"cursor-pointer"} />
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

  return (
    <div className="main-wrapper">
      <PageHeader heading={"Leads"} tableInstance={tableInstance}>
        {userRole !== 1 && (
          <AddNewLead
            setIsUpdated={setIsUpdated}
            customers={initialState.customers}
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

      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : (
          toggle
            ? leads?.confirmedLeads?.length > 0
            : leads?.notConfirmedLeads.length > 0
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
