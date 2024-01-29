import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// routes
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Leads from "./Pages/Leads/Leads";
import Customers from "./Pages/Customers/Customers";
import Users from "./Pages/Users/Users";
import Profile from "./Pages/Profile/Profile";
import NoPage from "./Pages/NoPage/NoPage";

// stylesheets
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Login/login.css";
import "./stylesheets/Header/header.css";
import "./stylesheets/Sidebar/sidebar.css";
import "./App.css";

// templates
import Header from "./Templates/Header/Header";
import Sidebar from "./Templates/Sidebar/Sidebar";

// private routes template
import TokenAuth from "./utils/PrivateRoutes/TokenAuth";

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
            path="/customers"
            element={
              <>
                <HeaderAndSiderbar />
                <Customers />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <HeaderAndSiderbar />
                <Users />
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
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
