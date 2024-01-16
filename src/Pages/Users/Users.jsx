import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";

import ReactSkeletonTable from "../../Templates/ReactSkeletonTable/ReactSkeletonTable";
import ReactTable from "../../Templates/ReactTable/ReactTable";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { AddNewUser } from "./AddNewUser";

const Users = () => {
  const { initialState, getAllUsers } = useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const columnHeaders = ["Sr no.", "Name", "Email ID", "Actions"];

  useEffect(() => {
    getAllUsers();
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
      //   Cell: ({ row }) => {
      //     return (
      //       row.original?.client_email?.split(",")[0] ?? row.original.client_email
      //     );
      //   },
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
  const data = useMemo(() => initialState.users, [initialState.users]);

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
      <h2>Users</h2>
      <div className="d-flex justify-content-end align-items-center">
        <AddNewUser setIsUpdated={setIsUpdated} />
      </div>
      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState.users.length > 0 ? (
        <ReactTable tableInstance={tableInstance} />
      ) : (
        <p className="m-0">No Users Found!</p>
      )}
    </div>
  );
};

export default Users;
