import React from "react";
import { Menu, Avatar, message } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined ,LoginOutlined} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const setMenu ="home";
const RightMenu = ({ mode }) => {
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
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="login"onClick={() => {
          setMenu("login");
          navigate("/login");

      }}>
          <LoginOutlined /> login
          
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
