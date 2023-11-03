import React, { useState } from "react";
import logo from "../Assets/Vmc.jpg";
import "./Navbar.css";
export const Navbar = () => {
  const [menu, setMenu] = useState("Home");
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
          }}
        >
          Home {menu === "Home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Register Complaint");
          }}
        >
          Register Complaint{menu === "Register Complaint" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Contact Us");
          }}
        >
          Contact Us{menu === "Contact Us" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Login");
          }}
        >
          Login{menu === "Login" ? <hr /> : <></>}
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
