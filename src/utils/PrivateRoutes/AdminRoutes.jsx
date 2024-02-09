import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const userRole = +JSON.parse(localStorage.getItem("user")).userRoles;
  return token && userRole === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
