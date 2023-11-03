import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OTPVerification.css"; // Import the OTPVerification.css file for styling
import Navbar from "../Navbar/Navbar";

const OTPVerification = () => {
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
    <div className="register-container">
      <Navbar />
      <form className="register-form">
        <h1>OTP Verification</h1>
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
  );
};

export default OTPVerification;
