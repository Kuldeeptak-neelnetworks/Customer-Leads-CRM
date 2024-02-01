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
import PageHeader from "../../Templates/PageHeader/PageHeader";
import { DeleteIconSVG, EditIconSVG } from "../../utils/SVGs/SVGs";
import ReactTableFooter from "../../Templates/ReactTableFooter/ReactTableFooter";

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

  // constructing headers for CSV Link
  const headers = {
    headings: [
      { label: "Name", key: "contact_name" },
      { label: "Email Id", key: "email_address" },
      { label: "Company", key: "company_name" },
      { label: "Contact", key: "mobile_no" },
    ],
    fileName: "Customers",
  };

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
        <div className="table-actions-wrapper d-flex justify-content-center align-items-center gap-2">
          <EditIconSVG cssClass={"cursor-pointer"} />
          <span style={{ color: "#00263d38" }}>|</span>
          <DeleteIconSVG cssClass={"cursor-pointer"} />
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

  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

  return (
    <div className="main-wrapper">
      <PageHeader heading={"Customers"} tableInstance={tableInstance}>
        {userRole !== 1 && (
          <AddNewCustomer
            setIsUpdated={setIsUpdated}
            customers={initialState.customers}
          />
        )}
      </PageHeader>

      {initialState.isLoading && initialState?.customers?.length <= 0 ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState?.customers?.length > 0 ? (
        <>
          <ReactTable tableInstance={tableInstance} />
          <ReactTableFooter
            data={initialState.customers}
            tableInstance={tableInstance}
            headers={headers}
          />
        </>
      ) : (
        <p className="m-0">No Customers Found!</p>
      )}
    </div>
  );
};

export default Customers;
