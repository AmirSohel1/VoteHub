import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Note: It is assumed that you have a functioning router and this context
// provider is wrapped around the application's main component.

// Create the context
const AuthContext = createContext();

// Custom hook to access the auth context
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProvider Component
 * This component provides authentication state and functions to the rest of the application.
 * It manages admin and voter login/logout and handles state persistence in localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [voter, setVoter] = useState(null);
  const [islogin, setLogin] = useState(false);
  const [candidates, setCandidatess] = useState([]);
  const navigate = useNavigate();

  // A function to set the list of candidates, used by the AllCandidate component.
  const set = (userss) => {
    setCandidatess(userss);
  };

  // Load authentication data from localStorage on initial component mount.
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const savedVoter = localStorage.getItem("voter");
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      // Check for admin or voter data in localStorage and set state
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
        setLogin(true);
      } else if (savedVoter) {
        setVoter(JSON.parse(savedVoter));
        setLogin(true);
      }
    }
  }, []);

  // Login Admin function
  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    setVoter(null); // Ensure voter state is cleared
    setLogin(true);
    localStorage.setItem("token", adminData.token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.removeItem("voter"); // Clear any old voter data
    console.log("Admin logged in:", adminData);
    navigate("/admin-dashboard");
  };

  // Login Voter function
  const loginVoter = (voterData) => {
    setVoter(voterData);
    setAdmin(null); // Ensure admin state is cleared
    setLogin(true);
    localStorage.setItem("token", voterData.token);
    localStorage.setItem("voter", JSON.stringify(voterData));
    localStorage.removeItem("admin"); // Clear any old admin data
    console.log("Voter logged in:", voterData);
    navigate("/voter-dashboard");
  };

  // Logout Admin function
  const logoutAdmin = () => {
    setAdmin(null);
    setLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/");
  };

  // Logout Voter function
  const logoutVoter = () => {
    setVoter(null);
    setLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("voter");
    navigate("/");
  };

  // The value provided to all consuming components
  const value = {
    admin,
    voter,
    islogin,
    loginAdmin,
    loginVoter,
    candidates,
    set,
    logoutAdmin,
    logoutVoter,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
