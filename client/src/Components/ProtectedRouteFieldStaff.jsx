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

const ProtectedRouteFieldStaff = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  useEffect(() => {
    if (token && jwtDecode(token).role !== "admin") {
      presentPage();
    }
  }, [token && jwtDecode(token).role !== "admin"]);

  if (!token) return <Navigate to="/" />;
  const decodedData = jwtDecode(token);

  if (decodedData.role === "admin") {
    return <Outlet {...props} />;
  } else if (decodedData.role !== "admin") {
    presentPage();
  }
};

export default ProtectedRouteFieldStaff;
