import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Register/login.css";

// ... (your existing imports)

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
    userType: "user",
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
          navigate("/Layout", { replace: true });
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
          <h1 id="loginh1">Login</h1>
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
          <button className={basestyle.button_common} onClick={loginHandler}>
            Login
          </button>
        </form>
        {user.userType === "user" && (
          <NavLink to="/signup">Not yet registered? Register Now</NavLink>
        )}
      </div>
    </>
  );
};

export default Login;
