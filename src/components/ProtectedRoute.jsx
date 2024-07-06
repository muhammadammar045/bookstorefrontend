import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userAuthSlice";

function ProtectedRoute() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  return <>{user ? <Outlet /> : navigate("/login")}</>;
}

export default ProtectedRoute;
