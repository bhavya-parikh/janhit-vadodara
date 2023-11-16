import React, { useState } from "react";
import logo from "../Assets/Vmc.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { ToastContainer, toast } from "react-toastify";

export const AuthNavbar = () => {
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();
  const logout = async () => {
    const res = await axios.post("http://localhost:5000/api/user/logout/", {
      withCredentials: true,
    });
    console.log(res.data);
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <ToastContainer />
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p className="vmc">Vadodara Municipal Corporation</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
            navigate("/");
          }}
        >
          Home {menu === "Home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Register Complaint");
            navigate("/complaint");
          }}
        >
          Register Complaint{menu === "Register Complaint" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Contact Us");
            navigate("/contact");
          }}
        >
          Contact Us{menu === "Contact Us" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Logout");
            logout();
            toast("Logged Out Successfully!");
          }}
        >
          Logout{menu === "Logout" ? <hr /> : <></>}
        </li>
      </ul>
    </div>
  );
};
export default AuthNavbar;
