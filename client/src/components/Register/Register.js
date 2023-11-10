import React, { useEffect, useState } from "react";
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
        .post("http://localhost:5000/api/user/register", user)
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
      <div id="login1" className={registerstyle.register}>
        <form>
          <h1 id="loginh1">Create your account</h1>
          <input
            className="keyur"
            type="text"
            name="addharid"
            id="addharid"
            placeholder="Aadhar Number"
            onChange={changeHandler}
            value={user.addharid}
          />
          <p className={basestyle.error}>{formErrors.addharid}</p>
          <input
            className="keyur"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={changeHandler}
            value={user.username}
          />
          <p className={basestyle.error}>{formErrors.username}</p>
          <input
            className="keyur"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};

export default Register;
