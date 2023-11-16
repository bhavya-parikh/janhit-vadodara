import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "../Login/Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Register/login.css";

// ... (your existing imports)
const AdminLogin = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
    userType: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
    if (name === "userType" && value === "user") {
      navigate("/Login"); // Replace "/admin-login" with the actual route for your admin login page
    }
    if (name === "userType" && value === "fieldstaff") {
      navigate("/FieldStaffLogin"); // Replace "/admin-login" with the actual route for your admin login page
    }
    if (name === "userType" && value === "commissioner") {
      navigate("/CommissionerLogin"); // Replace "/admin-login" with the actual route for your admin login page
    }
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      error.username = "Username is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios
        .post("http://localhost:5000/api/user/login", user)
        .then((res) => {
          setUserState(res.data.user);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    }
  }, [formErrors]);
  return (
    <>
      <ToastContainer />
      <div id="login1" className={loginstyle.login}>
        <form>
          <h1 id="loginh1">Login As Admin</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={changeHandler}
            value={user.username}
          />
          <p className={basestyle.error}>{formErrors.username}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <select
            id="userType"
            name="userType"
            value={user.userType}
            onChange={changeHandler}
            className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="admin">Admin</option>
            <option value="commissioner">Commissioner</option>
            <option value="fieldstaff">Field Staff</option>
          </select>

          <button className={basestyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default AdminLogin;
