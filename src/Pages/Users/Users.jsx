import { useContext, useEffect, useMemo, useState } from "react";
import { ContextMain } from "../../Context/MainContext";

import ReactSkeletonTable from "../../Templates/ReactSkeletonTable/ReactSkeletonTable";
import ReactTable from "../../Templates/ReactTable/ReactTable";
import { AddNewUser } from "./AddNewUser";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { DeleteIconSVG, EditIconSVG } from "../../utils/SVGs/SVGs";
import PageHeader from "../../Templates/PageHeader/PageHeader";
import ReactTableFooter from "../../Templates/ReactTableFooter/ReactTableFooter";

const Users = () => {
  const { initialState, getAllUsers } = useContext(ContextMain);
  const [isUpdated, setIsUpdated] = useState(false);

  const columnHeaders = ["Sr no.", "Name", "Email ID", "Actions"];

  // constructing headers for CSV Link
  const headers = {
    headings: [
      { label: "Name", key: "name" },
      { label: "Email Id", key: "email" },
    ],
    fileName: "Leads",
  };

  useEffect(() => {
    getAllUsers();
  }, [isUpdated]);

  const getProfile = (input) =>
    JSON.parse(input?.additionalData?.users_metas)?.profile_picture;

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "sr no.",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Profile",
      Cell: ({ row }) => {
        const profilePic = getProfile(row.original);
        const imgUrl = profilePic
          ? `https://crm.neelnetworks.org/${profilePic}`
          : "https://neelnetworks.org/dummy.jpg";
        return (
          <img src={imgUrl} alt="profile-image" className="profile-image" />
        );
      },
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
      Header: "Role",
      accessor: "userRoles",
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
      <PageHeader heading={"Users"} tableInstance={tableInstance}>
        <AddNewUser setIsUpdated={setIsUpdated} />
      </PageHeader>

      {initialState.isLoading ? (
        <ReactSkeletonTable columnHeaders={columnHeaders} />
      ) : initialState.users.length > 0 ? (
        <>
          <ReactTable tableInstance={tableInstance} />
          <ReactTableFooter
            data={initialState.users}
            tableInstance={tableInstance}
            headers={headers}
          />
        </>
      ) : (
        <p className="m-0">No Users Found!</p>
      )}
    </div>
  );
};

export default Users;
