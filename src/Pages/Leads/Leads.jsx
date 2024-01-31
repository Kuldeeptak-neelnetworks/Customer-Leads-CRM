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
  const { initialState, getAllLeads, getAllCustomers } =
    useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const columnHeaders = ["Sr no.", "Name", "Company", "Actions"];

  // constructing headers for CSV Link
  const headers = {
    headings: [
      { label: "Name", key: "contact_name" },
      { label: "Company", key: "company_name" },
    ],
    fileName: "Leads",
  };

  useEffect(() => {
    getAllLeads();
    getAllCustomers();
  }, [isUpdated]);

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
  const data = useMemo(() => initialState.leads, [initialState.leads]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

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

      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState.leads.length > 0 ? (
        <>
          <ReactTable tableInstance={tableInstance} />
          <ReactTableFooter
            data={initialState.leads}
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
