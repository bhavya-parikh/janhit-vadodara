import { useEffect } from "react";
import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { message } from "antd";

const ProtectedRouteUser = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }
  useEffect(() => {
    function presentPage() {
      navigate(-1);
    }
    if (token && jwtDecode(token).id.role !== "user") {
      presentPage();
    }
  }, [token && jwtDecode(token).id.role !== "user"]);

  if (!token) {
    toast.error("Login Or Register to Register A Complaint");
    return <Navigate to="/" />;
  }
  const decodedData = jwtDecode(token);

  if (decodedData.id.role === "user") {
    return <Outlet {...props} />;
  } else if (decodedData.role !== "admin") {
    presentPage();
  }
};

export default ProtectedRouteUser;
