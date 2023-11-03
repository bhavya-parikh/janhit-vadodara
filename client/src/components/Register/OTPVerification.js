import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login1 from "../Register/login.css"

const OTPVerification  = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const handleOTPVerification = (e) => {
    e.preventDefault();

    // Add logic to verify the OTP here
    if (otp === "123") {
      // OTP is verified successfully
      setVerificationStatus("OTP verified successfully.");
      navigate("/login"); // Navigate to the login page after successful OTP verification
    } else {
      // OTP verification failed
      if (otp === "") {
        setVerificationStatus("Please enter OTP");
      } else {
        setVerificationStatus("Wrong OTP. Please try again.");
      }
    }
  };


  return (
    <>
      <ToastContainer />
      <div id="login1" className={registerstyle.register}>
      <form className="register-form">
        <h1 id="loginh1">OTP Verification</h1>
        <input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          />
        <button className="register-button" onClick={handleOTPVerification}>
          Verify OTP
        </button>
        <p className="error">{verificationStatus}</p>
        </form>
      </div>
    </>
  );
};

export default OTPVerification;;
