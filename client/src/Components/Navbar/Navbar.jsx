import React, { useState } from "react";
import logo from "../Assets/Vmc.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserChange = (userType) => {
    setSelectedUser(userType);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
        <li>
          <div onClick={toggleDropdown}>
            Login {menu === "Login" ? <hr /> : <></>}
          </div>
          {dropdownOpen && (
            <div className="absolute mt-52 p-2 bg-white text-black rounded shadow">
              <div
                onClick={() => {
                  handleUserChange("User");
                  navigate("/login");
                }}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                User {selectedUser === "User" ? <hr /> : <></>}
              </div>
              <div
                onClick={() => {
                  handleUserChange("Admin");
                  navigate("/AdminLogin");
                }}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                Admin {selectedUser === "Admin" ? <hr /> : <></>}
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
