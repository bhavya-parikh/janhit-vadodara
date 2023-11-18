import axios from "axios";
import "./App.css";
import { useAuth } from "./AuthProvider";
import "react-toastify/dist/ReactToastify.min.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import OTPVerification from "./Components/Register/OTPVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout.jsx";
import Card from "./Components/contect/contect";
import Navbar from "./Components/Navbar/Navbar/Navbar.jsx";
import ProtectedRouteUser from "./Components/ProtectedRouterUser";
import ProtectedRouteFieldStaff from "./Components/ProtectedRouteFieldStaff";
import Dashboard from "./Components/Dashboard/dashboard";
import AuthNavbar from "./Components/Navbar/AuthNavbar/AuthNavbar.jsx";
import Home from "./Components/Dashboard/dashboad1";
import Main from "./Components/Layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Complaint from "./Components/Complaint/complaint.jsx";
import { ComplaintTracking } from "./Components/ComplaintTracking/complainttracking.jsx";

import AdminLogin from "./Components/AdminLogin/AdminLogin.js";
import FieldStaffLogin from "./Components/FieldStaffLogin/FieldStaffLogin.js";
import CommissionerLogin from "./Components/CommissionerLogin/CommissionerLogin.js";
import AddFieldStaff from "./Components/deptHead/addFieldStaff.jsx";
import { RemoveFieldStaff } from "./Components/deptHead/RemoveFieldStaff.jsx";
import Review from "./Components/Review/Review.jsx";
import { MyComplaints } from "./Components/MyComplaints/MyComplaints.jsx";
import Progressbar  from "../src/Components/Progressbar/Progress.js"
const cardData = [
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 1",
  },{
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    email: "temp-mail@gmail.com",
    wardNo: "Ward 2",
  },{
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
  const { auth } = useAuth();

  const [userRole, setUserRole] = useState(null);

  const [userstate, setUserState] = useState({});
  return (
    <>
      <ToastContainer />
      {auth ? <AuthNavbar /> : <Navbar />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/otpverification" element={<OTPVerification />}></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route element={<ProtectedRouteUser />}>
            <Route path="/complaint" element={<Complaint />}></Route>
          </Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route
            path="/dashboard1"
            element={
              <Main>
                <Home />
              </Main>
            }
          />
          <Route path="/Review" element={<Review />}></Route>
          <Route
            path="/complaintTracking"
            element={<ComplaintTracking />}
          ></Route>
          <Route
            path="/progress"
            element={< Progressbar />}
          ></Route>
          <Route
            path="/AdminLogin"
            element={<AdminLogin setUserState={setUserState} />}
          ></Route>
          <Route
            path="/FieldStaffLogin"
            element={<FieldStaffLogin setUserState={setUserState} />}
          ></Route>
          <Route
            path="/AddFieldStaff"
            element={<AddFieldStaff setUserState={setUserState} />}
          ></Route>
          <Route
            path="/RemoveFieldStaff"
            element={<RemoveFieldStaff />}
          ></Route>
          <Route
            path="/CommissionerLogin"
            element={<CommissionerLogin />}
          ></Route>
          <Route path="/mycomplaints" element={<MyComplaints />}></Route>

          <Route
            path="/contact"
            element={
              <>
                <h1 className="contact_us">Contact Us</h1>
                <div className="card-container">
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
      </div>
    </>
  );
}

export default App;
