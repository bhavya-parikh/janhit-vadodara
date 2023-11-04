import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import OTPVerification from "./Components/Register/OTPVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout";
import contect from "./Components/contect/contect";
import Card from "./Components/contect/contect";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/dashboard";
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
    emailid: "temp-mail@gmail.com",
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
    emailid: "temp-mail@gmail.com",
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
    emailid: "temp-mail@gmail.com",
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
      <Navbar></Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/otpverification" element={<OTPVerification />}></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

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
      </div>
    </>
  );
}

export default App;
