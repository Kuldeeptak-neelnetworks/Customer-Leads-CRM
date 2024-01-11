import { Navigate, Outlet } from "react-router-dom";

const TokenAuth = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default TokenAuth;
