import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [voter, setVoter] = useState(null);
  const [islogin, setLogin] = useState(false);
  const [candidates, setCandidatess] = useState([]);
  const navigate = useNavigate();
  const set = (userss) => {
    setCandidatess(userss);
  };

  // Load authentication data from localStorage
  // useEffect(() => {
  //   const savedAdmin = localStorage.getItem("admin");
  //   const savedVoter = localStorage.getItem("voter");

  //   if (savedAdmin) {
  //     setAdmin(JSON.parse(savedAdmin));
  //   }

  //   if (savedVoter) {
  //     setVoter(JSON.parse(savedVoter));
  //   }
  // }, []);

  // Login Admin
  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    setLogin(true);
    console.log(adminData);
    localStorage.setItem("token", adminData.token); // Save to localStorage
    navigate("/admin-dashboard");
  };

  // Login Voter
  const loginVoter = (voterData) => {
    setLogin(true);
    setVoter(voterData);
    localStorage.setItem("token", voterData.token); // Save to localStorage
    // console.log(voterData);
    navigate("/voter-dashboard");
  };

  const value = {
    admin,
    voter,
    islogin,
    loginAdmin,
    loginVoter,
    candidates,
    set,
    logoutAdmin: () => {
      setAdmin(null);
      setLogin(false);
      localStorage.removeItem("token"); // Remove from localStorage
      localStorage.removeItem("id");
      navigate("/");
    },
    logoutVoter: () => {
      setLogin(false);
      setVoter(null);
      localStorage.removeItem("token"); // Remove from localStorage
      localStorage.removeItem("id");
      navigate("/");
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
