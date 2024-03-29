import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

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
import { DeleteIconSVG, EditIconSVG, PlusIconSVG } from "../../utils/SVGs/SVGs";
import ReactTableFooter from "../../Templates/ReactTableFooter/ReactTableFooter";

const Customers = () => {
  const navigate = useNavigate();
  const { initialState, getAllCustomers, getMyCustomers } =
    useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;

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
    if (userRole === 1) {
      getAllCustomers();
    } else {
      getMyCustomers();
    }
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
        <div className="table-actions-wrapper d-flex justify-content-center align-items-center">
          {userRole === 1 ? (
            <>
              <Tooltip
                id="show-customer-tooltip"
                style={{
                  background: "#000",
                  color: "#fff",
                }}
                opacity={0.9}
              />
              <div
                data-tooltip-id="show-customer-tooltip"
                data-tooltip-content="Check Customer Details"
                data-tooltip-place="top"
                onClick={() => navigate(`/customers/${row.original?.id}`)}
                className="cursor-pointer table-actions-icon-wrapper"
              >
                <PlusIconSVG />
              </div>
            </>
          ) : (
            <>
              <Tooltip
                id="edit-customer-tooltip"
                style={{
                  background: "#000",
                  color: "#fff",
                }}
                opacity={0.9}
              />
              <div
                data-tooltip-id="edit-customer-tooltip"
                data-tooltip-content="Edit Customer Details"
                data-tooltip-place="top"
                onClick={() => navigate(`/customers/${row.original?.id}`)}
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
    () => (userRole === 1 ? initialState.customers : initialState.myCustomers),
    [userRole, initialState.myCustomers, initialState.customers]
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

  // Checking if the customers data is not available
  const customersDataNotAvailable =
    userRole === 1
      ? initialState?.customers?.length <= 0
      : initialState?.myCustomers?.length <= 0;

  // Checking if the customers data is not available && loading state is true
  const isLoading = initialState.isLoading && customersDataNotAvailable;

  // Checking if the customers data is available
  const customersDataAvailable =
    userRole === 1
      ? initialState?.customers?.length > 0
      : initialState?.myCustomers?.length > 0;

  return (
    <div className="main-wrapper">
      <PageHeader heading={"Customers"} tableInstance={tableInstance}>
        {userRole !== 1 && <AddNewCustomer setIsUpdated={setIsUpdated} />}
      </PageHeader>

      {isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : customersDataAvailable ? (
        <>
          <ReactTable tableInstance={tableInstance} />
          <ReactTableFooter
            data={data}
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
