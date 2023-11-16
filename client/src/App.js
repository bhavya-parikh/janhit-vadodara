import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import OTPVerification from "./Components/Register/OTPVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout.jsx";
import Card from "./Components/contect/contect";
import Navbar from "./Components/Navbar/Navbar";
import Complaint from "./Components/Complaint/complaint.jsx";
import { ComplaintTracking } from "./Components/ComplaintTracking/complainttracking.jsx";

import Dashboard from "./Components/Dashboard/dashboard";
import AdminLogin from "./Components/AdminLogin/AdminLogin.js";
import FieldStaffLogin from "./Components/FieldStaffLogin/FieldStaffLogin.js";
import CommissionerLogin from "./Components/CommissionerLogin/CommissionerLogin.js";
import AddFieldStaff from "./Components/deptHead/addFieldStaff.jsx";
import { RemoveFieldStaff } from "./Components/deptHead/RemoveFieldStaff.jsx";
import Review from "./Components/Review/Review.jsx";
const cardData = [
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 1",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 2",
  },
  {
    name: "Bob Johnson",
    mobileNumber: "555-123-4567",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 3",
  },
  {
    name: "Alice Williams",
    mobileNumber: "111-222-3333",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 4",
  },
  {
    name: "Bravo Donald",
    mobileNumber: "111-222-3333",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 5",
  },
  {
    name: "Smint Jhonathon",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 6",
  },
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 7",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 8",
  },
  {
    name: "Bob Johnson",
    mobileNumber: "555-123-4567",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 9",
  },
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 10",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 11",
  },
  {
    name: "Bob Johnson",
    mobileNumber: "555-123-4567",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 12",
  },
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 13",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 14",
  },
  {
    name: "Bob Johnson",
    mobileNumber: "555-123-4567",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 15  ",
  },
];

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/otpverification" element={<OTPVerification />}></Route>
        <Route
          path="/ComplaintTracking"
          element={<ComplaintTracking />}
        ></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/FieldStaffLogin" element={<FieldStaffLogin />}></Route>
        <Route path="/AddFieldStaff" element={<AddFieldStaff />}></Route>
        <Route path="/RemoveFieldStaff" element={<RemoveFieldStaff />}></Route>
        <Route
          path="/CommissionerLogin"
          element={<CommissionerLogin />}
        ></Route>
        <Route
          path="/login"
          element={<Login setUserState={setUserState} />}
        ></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/complaint" element={<Complaint />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Review" element={<Review />}></Route>
        <Route
          path="/contact"
          element={
            <>
              <h1 className="contact_us">Contact Us</h1>
              <div className="card-grid">
                {cardData.map((data, index) => (
                  <Card
                    key={index}
                    name={data.name}
                    mobileNumber={data.mobileNumber}
                    email={data.email}
                    wardNo={data.wardNo}
                  />
                ))}
              </div>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
