import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import "./App.css";
import { useAuth } from "./AuthProvider";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout.jsx";
import Navbar from "./Components/Navbar/Navbar/Navbar.jsx";
import ProtectedRouteUser from "./Components/ProtectedRouterUser";
import ProtectedRouteFieldStaff from "./Components/ProtectedRouteFieldStaff";
import AuthNavbar from "./Components/Navbar/AuthNavbar/AuthNavbar.jsx";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Spin } from "antd";

const RemoveFieldStaff = lazy(() =>
  import("./Components/deptHead/RemoveFieldStaff.jsx")
);
const MyComplaints = lazy(() =>
  import("./Components/MyComplaints/MyComplaints.jsx")
);
const AddDeptHead = lazy(() =>
  import("./Components/Commissioner/AddDeptHead.jsx")
);
const RemoveDeptHead = lazy(() =>
  import("./Components/Commissioner/RemoveDeptHead.jsx")
);
const AddFieldStaff = lazy(() =>
  import("./Components/deptHead/addFieldStaff.jsx")
);

const Progressbar = lazy(() =>
  import("../src/Components/Progressbar/Progress.js")
);
const Review = lazy(() => import("./Components/Review/Review.jsx"));
const AdminLogin = lazy(() => import("./Components/AdminLogin/AdminLogin.js"));
const ComplaintTracking = lazy(() =>
  import("./Components/ComplaintTracking/complainttracking.jsx")
);
const Complaint = lazy(() => import("./Components/Complaint/complaint.jsx"));
const AboutUs = lazy(() => import("./Components/AboutUs/AboutUs.jsx"));
const Main = lazy(() => import("./Components/Layout/Main"));
const Home = lazy(() => import("./Components/Dashboard/dashboad1"));
const Card = lazy(() => import("./Components/contect/contect"));

const Dashboard = lazy(() => import("./Components/Dashboard/dashboard"));
const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const OTPVerification = lazy(() =>
  import("./Components/Register/OTPVerification")
);

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
  const { auth } = useAuth();

  const [userRole, setUserRole] = useState(null);

  const [userstate, setUserState] = useState({});
  return (
    <>
      <ToastContainer />
      {auth ? <AuthNavbar /> : <Navbar />}
      <div className="App">
        <Suspense
          fallback={
            <Spin loading="true" fullscreen="true" tip="Please wait..." />
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}></Route>
            <Route
              path="/otpverification"
              element={<OTPVerification />}
            ></Route>
            <Route
              path="/login"
              element={<Login setUserState={setUserState} />}
            ></Route>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
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
            <Route path="/progress" element={<Progressbar />}></Route>
            <Route
              path="/AdminLogin"
              element={<AdminLogin setUserState={setUserState} />}
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
              path="/AddDeptHead"
              element={<AddDeptHead setUserState={setUserState} />}
            ></Route>
            <Route path="/RemoveDeptHead" element={<RemoveDeptHead />}></Route>
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
        </Suspense>
      </div>
    </>
  );
}

export default App;
