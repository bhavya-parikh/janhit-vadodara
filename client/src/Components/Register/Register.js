import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login1 from "../Register/login.css";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    addharid: "",
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.addharid) {
      error.addharid = "ID Number is required";
    }

    if (!values.username) {
      error.username = "Username is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }

    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios
        .post(`${process.env.REACT_APP_VERCEL_ENV_BASEURL}`, user, {
          withCredentials: true,
        })
        .then((res) => {
          navigate("/OTPVerification", { replace: true });
        })
        .catch((error) => {
          toast(error.response.data.message);
        });
    }
  }, [formErrors]);

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center w-full  sm:w-auto ml-0  md:w-auto mb-24 mt-10 mx-auto h-fit ">
          <div className="bg-white border-2 border-gray-300 shadow-md rounded p-4 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Form
                name="registerForm"
                onFinish={signupHandler}
                className="space-y-4 md:space-y-6"
              >
                <h1 className="font-bold mt-10 mb-14 text-2xl md:text-3xl lg:text-4xl">
                  Create your account
                </h1>
                <Form.Item
                  rules={[{ required: true, message: "ID Number is required" }]}
                >
                  <Input
                    className="keyur"
                    type="text"
                    name="addharid"
                    id="addharid"
                    placeholder="Aadhar Number"
                    prefix={<UserOutlined />}
                    onChange={changeHandler}
                    value={user.addharid}
                  />
                  <p className={basestyle.error}>{formErrors.addharid}</p>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input
                    className="keyur"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    onChange={changeHandler}
                    value={user.username}
                  />
                  <p className={basestyle.error}>{formErrors.username}</p>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    className="keyur"
                    type="password"
                    name="password"
                    id="password"
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                    onChange={changeHandler}
                    value={user.password}
                  />
                  <p className={basestyle.error}>{formErrors.password}</p>
                </Form.Item>
                <Form.Item>
                  <Button
                    className={basestyle.button_common}
                    onClick={signupHandler}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
              <NavLink to="/login">Already registered? Login</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
