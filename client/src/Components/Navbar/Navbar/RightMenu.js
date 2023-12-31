import React from "react";
import { Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
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
            <span className="username"></span>
          </>
        }
      >
        <Menu.Item
          key="login"
          onClick={() => {
            setMenu("login");
            navigate("/login");
          }}
        >
          <LoginOutlined /> login
        </Menu.Item>
        <Menu.Item
          key="adminlogin"
          onClick={() => {
            setMenu("adminlogin");
            navigate("/AdminLogin");
          }}
        >
          <LoginOutlined /> Admin login
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
