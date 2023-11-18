import React from "react";
import { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

// const setMenu ="home";
const LeftMenu = ({ mode }) => {
  
const [menu, setMenu] = useState("Home");
const navigate = useNavigate();
  return (
    <Menu mode={mode}>
      <Menu.Item key="Home"
      onClick={() => {
        setMenu("Home");
        navigate("/");
      }}>Home</Menu.Item>
      <Menu.Item key="RegisterComplaint"
      onClick={() => {
        setMenu("RegisterComplaint");
        navigate("/Complaint");
      }}>Register Complaint</Menu.Item>
      <Menu.Item key="about"
      onClick={() => {
        setMenu("aboutus");
        navigate("/aboutus");
      }}>About Us</Menu.Item>
      <Menu.Item key="contact"
      onClick={() => {
        setMenu("contact");
        navigate("/contact");
      }}>Contact Us</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;