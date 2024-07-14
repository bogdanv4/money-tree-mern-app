import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
