import React, { useEffect, useState } from "react";
import { useAuth } from "../context/VoterAuth";
import { useNavigate } from "react-router-dom";
// import? "./Navbar.css";
function Navbar() {
  const [userName, setUserName] = useState("");
  const [Login, setLogin] = useState(false);
  const { islogin, logoutAdmin, logoutVoter, admin, voter } = useAuth();
  const navigate = useNavigate();
  const handleAuthToggle = () => {
    navigate("/login");
    if (islogin) {
      if (admin) {
        logoutAdmin();
      } else if (voter) {
        logoutVoter();
      }
    }
  };

  useEffect(() => {
    if (islogin) {
      const token = localStorage.getItem("token");
      if (token) setLogin(true);
      if (admin) {
        setUserName(admin.name);
      } else if (voter) {
        setUserName(voter.name);
      }
    } else {
      setUserName("");
    }
  }, [admin, voter, islogin]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Vote-App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {Login ? (
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              ) : (
                <a className="nav-link" href="#">
                  Home
                </a>
              )}
            </li>
            {islogin && (
              <li className="nav-item">
                <span className="nav-link">Welcome, {userName}!</span>
              </li>
            )}
            <li className="nav-item">
              <button
                className="btn btn-outline-primary ms-2"
                onClick={handleAuthToggle}
              >
                {islogin ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
