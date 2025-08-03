import React from "react";
import { Navigate } from "react-router-dom";
// Assuming the useAuth hook is correctly implemented
import { useAuth } from "../context/VoterAuth";

/**
 * PrivateRoute Component
 * This component protects routes by checking the user's authentication status and role.
 * If the user is authenticated and has the required role, it renders the children.
 * Otherwise, it redirects them to the home page or login page.
 * @param {object} props - The component props.
 * @param {string} props.role - The required role to access the route ('admin' or 'voter').
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 */
function PrivateRoute({ role, children }) {
  const { admin, voter } = useAuth();

  // Check if the user is an admin
  const isAdmin = admin && role === "admin";

  // Check if the user is a voter
  const isVoter = voter && role === "voter";

  // If the user has the required role, render the children
  if (isAdmin || isVoter) {
    return children;
  }

  // If no user is logged in or the user doesn't have the required role,
  // redirect them to the login page.
  return <Navigate to="/login" />;
}

export default PrivateRoute;
