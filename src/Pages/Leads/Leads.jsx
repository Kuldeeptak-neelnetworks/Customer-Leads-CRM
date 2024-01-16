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

const Leads = () => {
  const { initialState, getAllCustomers } = useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const columnHeaders = ["Sr no.", "Name", "Email ID", "Actions"];

  useEffect(() => {
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
      accessor: "name",
    },
    {
      Header: "Email ID",
      accessor: "email",
    },
    {
      Header: "Company",
      accessor: "company_name",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="table-actions-wrapper d-flex justify-content-center align-items-center gap-4">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
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
      <h2>Leads</h2>
      {userRole !== 1 && (
        <div className="d-flex justify-content-end align-items-center">
          <AddNewLead
            setIsUpdated={setIsUpdated}
            customers={initialState.customers}
          />
        </div>
      )}
      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState.leads.length > 0 ? (
        <ReactTable tableInstance={tableInstance} />
      ) : (
        <p className="m-0">No Leads Found!</p>
      )}
    </div>
  );
};

export default Leads;
