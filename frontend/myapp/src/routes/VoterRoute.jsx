import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/VoterAuth";

function VoterRoute({ children }) {
  const { voter } = useAuth();
  return voter ? children : <Navigate to="/"></Navigate>;
}

export default VoterRoute;
