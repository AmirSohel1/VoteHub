import React, { useEffect } from "react";
import "./Voter.css";
import { useAuth } from "../context/VoterAuth";
import { useState } from "react";
import VoterMainPage from "./VoterMainPage";
import Elections from "./Elections";
import ElectionDetailsPage from "./ElectionDetailsPage";
import { Routes, Route } from "react-router-dom";
import Vote from "./Vote";
import "./VoterDash.css";

function VoterDash({ children }) {
  const [user, setUser] = useState("");
  const { voter } = useAuth();

  useEffect(() => {
    setUser(voter);
  }, [user]);
  // console.log(user);
  return (
    <div className="container_voter">
      <div className="sidebar">
        <div className="voter-card bg-transparent">
          <h4>Voter Details</h4>
          <div className="card bg-transparent">
            <div className="card-header">
              <h4>Name: {user.name}</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>VoterId:</strong> {user.voterId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main_box_voter">
        <Routes>
          <Route path="/" element={<VoterMainPage />} />
          <Route path="/elections" element={<Elections />} />
          {/* <Route
            path="/electionDetails/:id"
            element={<ElectionDetailsPage />}
          /> */}
          <Route path="/vote/:id" element={<Vote />} />
        </Routes>
      </div>
    </div>
  );
}

export default VoterDash;
