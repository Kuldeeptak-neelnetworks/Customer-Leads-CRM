import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// routes
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Leads from "./Pages/Leads/Leads";
import EditLead from "./Pages/Leads/EditLead";
import Customers from "./Pages/Customers/Customers";
import CustomerDetails from "./Pages/Customers/CustomerDetails";
import EmailDetails from "./Pages/Customers/EmailDetails";
import Users from "./Pages/Users/Users";
import Profile from "./Pages/Profile/Profile";
import NoPage from "./Pages/NoPage/NoPage";

// stylesheets
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Login/login.css";
import "./stylesheets/Header/header.css";
import "./stylesheets/Sidebar/sidebar.css";
import "./stylesheets/custom-classes.css";
import "./stylesheets/common.css";
import "./App.css";

// templates
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

// private routes template
import TokenAuth from "./utils/PrivateRoutes/TokenAuth";
import AdminRoutes from "./utils/PrivateRoutes/AdminRoutes";

const HeaderAndSiderbar = () => {
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NoPage />} />
        <Route element={<TokenAuth />}>
          <Route
            path="/dashboard"
            element={
              <>
                <HeaderAndSiderbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/leads"
            element={
              <>
                <HeaderAndSiderbar />
                <Leads />
              </>
            }
          />
          <Route
            path="/leads/:leadId"
            element={
              <>
                <HeaderAndSiderbar />
                <EditLead />
              </>
            }
          />
          <Route
            path="/customers"
            element={
              <>
                <HeaderAndSiderbar />
                <Customers />
              </>
            }
          />
          <Route
            path="/customers/:customerId"
            element={
              <>
                <HeaderAndSiderbar />
                <CustomerDetails />
              </>
            }
          />
          <Route
            path="/customers/:customerId/emails/:emailId"
            element={
              <>
                <HeaderAndSiderbar />
                <EmailDetails />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <HeaderAndSiderbar />
                <Profile />
              </>
            }
          />
          <Route element={<AdminRoutes />}>
            <Route
              path="/users"
              element={
                <>
                  <HeaderAndSiderbar />
                  <Users />
                </>
              }
            />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
