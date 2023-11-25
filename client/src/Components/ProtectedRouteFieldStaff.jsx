import { useEffect } from "react";
import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const ProtectedRouteFieldStaff = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  useEffect(() => {
    if (token && jwtDecode(token).id.role !== "fieldStaff") {
      toast.error("You're not authorized to access this page!");
      presentPage();
    }
  }, [token && jwtDecode(token).id.role !== "fieldStaff"]);

  if (!token) {
    toast.error("Login First To Access This Page!");
    return <Navigate to="/" />;
  }
  const decodedData = jwtDecode(token);

  if (decodedData.id.role === "fieldStaff") {
    return <Outlet {...props} />;
  } else if (decodedData.id.role !== "fieldStaff") {
    toast.error("You're not authorized to access this page!");
    presentPage();
  }
};

export default ProtectedRouteFieldStaff;
