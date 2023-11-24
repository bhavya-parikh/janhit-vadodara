import React, { useState, useEffect } from "react";
import logo from "../../Assets/Vmc.jpg";
import "./AuthNavbar.css";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthProvider";
import { ToastContainer, toast } from "react-toastify";

export const AuthNavbar = () => {
  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
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
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <div className="navbar-menu">
              <Button className="menuButton" type="text" onClick={showDrawer}>
                <MenuOutlined />
              </Button>
              <div className="rightMenu">
                <RightMenu mode={"horizontal"} />
              </div>
              <div className="leftMenu">
                <LeftMenu mode={"horizontal"} />
              </div>
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  className="w-16 h-auto md:w-24 lg:w-32 xl:w-40"
                />
                <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center mt-2">
                  Vadodara Municipal <br class="md:hidden" />
                  Corporation
                </h3>
              </a>
            </div>

            <Drawer
              title={"Menu"}
              placement="right "
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};
export default AuthNavbar;
