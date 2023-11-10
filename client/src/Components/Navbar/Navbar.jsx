import React, { useState } from "react";
import logo from "../Assets/Vmc.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  return (
    <div className="navbar">
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
            setMenu("Login");
            navigate("/login");
          }}
        >
          Login{menu === "Login" ? <hr /> : <></>}
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
