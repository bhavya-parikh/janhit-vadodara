import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import OTPVerification from "./Components/Register/OTPVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout";
import Complaint from "./Components/Complaint/complaint";
function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Routes>
        <Route path="/layout" element={<Layout />}></Route>
        <Route path="/otpverification" element={<OTPVerification />}></Route>
        <Route path="/complaint" element={<Complaint />}></Route>

        <Route
          path="/login"
          element={<Login setUserState={setUserState} />}
        ></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
