import React from "react";
import { useAuth } from "../context/VoterAuth";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/" />;
}

export default AdminRoute;
