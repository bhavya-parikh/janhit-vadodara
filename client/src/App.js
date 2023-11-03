import "./App.css";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import OTPVerification from "./components/Register/OTPVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout"
function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route 
            path="/otpverification" 
              element={<OTPVerification />}></Route>
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
