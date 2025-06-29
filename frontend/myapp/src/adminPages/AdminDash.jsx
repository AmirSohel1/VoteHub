import React, { useEffect, useState } from "react";
import "./Admin.css";
import BarByAge from "../graphs/BarByAge";
import BarChart from "../graphs/BarChart";
import axios from "../../services/api";
function AdminDash() {
  const [totalCandidate, setTotalCandidate] = useState("");
  const [totalVoter, setTotalVoter] = useState();

  const fetching = async () => {
    try {
      const cand_res = await axios.get("/user/allCandidate");
      const voter_res = await axios.get("/user/allVoter");
      setTotalCandidate(cand_res.data.candidates.length);
      setTotalVoter(voter_res.data.voters.length);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="main_container">
      <h3>Dashboard</h3>
      <div className="main_content">
        <div className="data_boxes">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4>Total election</h4>
                <h5>99k</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4>Total Candidate</h4>
                <h5>{totalCandidate}</h5>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4>Total Voter</h4>
                <h5>{totalVoter}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="data_graph">
          <div className="bar">
            {" "}
            <BarChart />
          </div>
          <div className="bar">
            <BarByAge />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
