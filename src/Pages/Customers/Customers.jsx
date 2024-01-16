import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";

import ReactSkeletonTable from "../../Templates/ReactSkeletonTable/ReactSkeletonTable";
import ReactTable from "../../Templates/ReactTable/ReactTable";
import { AddNewCustomer } from "./AddNewCustomer";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

const Customers = () => {
  const { initialState, getAllCustomers } = useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const columnHeaders = [
    "Sr no.",
    "Name",
    "Company",
    "Email",
    "Contact",
    "Actions",
  ];

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
      accessor: "contact_name",
    },
    {
      Header: "Company",
      accessor: "company_name",
    },
    {
      Header: "Email",
      accessor: "email_address",
    },
    {
      Header: "Contact",
      accessor: "mobile_no",
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
  const data = useMemo(() => initialState.customers, [initialState.customers]);

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
      <h2>Customers</h2>
      <div className="d-flex justify-content-end align-items-center">
        <AddNewCustomer setIsUpdated={setIsUpdated} />
      </div>
      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState.customers.length > 0 ? (
        <ReactTable tableInstance={tableInstance} />
      ) : (
        <p className="m-0">No Customers Found!</p>
      )}
    </div>
  );
};

export default Customers;
