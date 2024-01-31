import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../App"; // Adjust the import path as needed

const ProtectedRoute = () => {
  const [loggedIn] = useContext(LoginContext);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
