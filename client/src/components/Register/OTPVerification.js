import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerstyle from "./Register.module.css";
import basestyle from "../Base.module.css";
import loginstyle from "../Login/Login.module.css";

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
    <>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center w-full  sm:w-auto ml-0  md:w-auto mb-24 mt-10 mx-auto h-fit ">
          <div className="bg-white border-2 border-gray-300 shadow-md rounded p-4 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Form
                className="register-form"
                onFinish={handleOTPVerification}
                initialValues={{ otp }}
              >
                <h1 id="loginh1">OTP Verification</h1>
                <Form.Item
                  className="keyur"
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  rules={[
                    { required: true, message: "Please enter OTP" },
                    {
                      pattern: /^\d{3}$/,
                      message: "Please enter a valid 3-digit OTP",
                    },
                  ]}
                >
                  <Input placeholder="Enter OTP" />
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={handleOTPVerification}
                    type="primary"
                    htmlType="submit"
                    className={basestyle.button_common}
                  >
                    Verify OTP
                  </Button>
                </Form.Item>
                <p className="error">{verificationStatus}</p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OTPVerification;
