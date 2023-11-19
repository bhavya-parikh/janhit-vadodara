import React from "react";
import { Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { logout } from "./AuthNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const setMenu = "home";
const RightMenu = ({ mode }) => {
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();
  const logout = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_VERCEL_ENV_BASEURL}/api/user/logout/`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">Hello, {user.username}! </span>
          </>
        }
      >
        <Menu.Item
          key="MyComplaint"
          onClick={() => {
            // console.log(user);
            setMenu("Mycomplaint");
            navigate("/mycomplaints");
          }}
        >
          <SolutionOutlined /> My Complaints
        </Menu.Item>
        <Menu.Item
          key="log-out"
          onClick={() => {
            setMenu("Logout");
            logout();
            toast("Logged Out Successfully!");
          }}
        >
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
