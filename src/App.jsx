import { Routes, Route } from "react-router-dom";

// routes
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

// stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/Login-Signup/login-signup.css";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
