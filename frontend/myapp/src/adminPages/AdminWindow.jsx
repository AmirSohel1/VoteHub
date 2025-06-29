import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import "./Admin.css";
import AdminDash from "./AdminDash";
import AllCandidate from "../components/AllCandidate";
import AllVoter from "../components/AllVoter";
import AddCandidate from "../components/AddCandidiate"; // Fixed typo in import: "AddCandidiate" to "AddCandidate"
import AddVoter from "../components/AddVoter";
import Elections from "../voterPages/Elections";
import AddElection from "./AddElection";

function AdminWindow() {
  return (
    <div className="container_admin">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h4>
          Navigation <hr />
        </h4>

        <ul className="nav-list">
          <li>
            <NavLink to="dashboard" className="nav-link">
              <span className="rectangle"></span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="voters" className="nav-link">
              <span className="rectangle"></span>
              Voters
            </NavLink>
          </li>
          <li>
            <NavLink to="cands" className="nav-link">
              <span className="rectangle"></span>
              Candidates
            </NavLink>
          </li>
          <li>
            <NavLink to="add-cand" className="nav-link">
              <span className="rectangle"></span>
              Add Candidate
            </NavLink>
          </li>
          <li>
            <NavLink to="add-vote" className="nav-link">
              <span className="rectangle"></span>
              Add Voter
            </NavLink>
          </li>
          <li>
            <NavLink to="allElection" className="nav-link">
              <span className="rectangle"></span>
              Election
            </NavLink>
          </li>
          <li>
            <NavLink to="addElection" className="nav-link">
              <span className="rectangle"></span>
              Add Election
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main_container_routes">
        <Outlet />
        <Routes>
          {/* Define child routes */}
          <Route index path="dashboard" element={<AdminDash />} />
          <Route path="voters" element={<AllVoter />} />
          <Route path="cands" element={<AllCandidate />} />
          <Route path="add-cand" element={<AddCandidate />} />
          <Route path="add-vote" element={<AddVoter />} />
          <Route path="allElection" element={<Elections />} />
          <Route path="addElection" element={<AddElection />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminWindow;
