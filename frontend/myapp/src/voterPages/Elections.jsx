import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "../../services/api";
import "./Elections.css";

function Elections() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();
  const fetchElections = async () => {
    try {
      const response = await axios.get("/election/allElection");
      setElections(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const classifyAndSortElections = (elections) => {
    let ongoing = [];
    let notStarted = [];
    let ended = [];

    elections.forEach((ele) => {
      const now = new Date();
      const startDate = new Date(ele.startDate);
      const endDate = new Date(ele.endDate);

      if (startDate <= now && endDate >= now) {
        ongoing.push(ele);
      } else if (startDate > now) {
        notStarted.push(ele);
      } else if (endDate < now) {
        ended.push(ele);
      }
    });

    return {
      ongoing: ongoing.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      ),
      notStarted: notStarted.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      ),
      ended: ended.sort((a, b) => new Date(b.endDate) - new Date(a.endDate)),
    };
  };

  const { ongoing, notStarted, ended } = classifyAndSortElections(elections);

  return (
    <div className="container_election">
      <h2>
        Elections <hr />
      </h2>
      <div className="main_box_election">
        <div className="election-category">
          <h4>Ongoing</h4>
          {ongoing.map((ele, index) => (
            <div key={index} className="card bg-transparent mb-4">
              <div className="card-header">
                <h5>{ele.name}</h5>
              </div>
              <div className="card-body bg-transparent">
                <p>
                  <strong>Status:</strong> {ele.status}
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => navigate(`/electionDetails/${ele._id}`)} // Call the handler
                  className="btn btn-primary"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`vote/${ele._id}`)} // Call the handler
                  className="btn btn-primary mt-2"
                >
                  Vote Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="election-category">
          <h4>Upcoming</h4>
          {notStarted.map((ele, index) => (
            <div key={index} className="card bg-transparent mb-4">
              <div className="card-header">
                <h5>{ele.name}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Status:</strong> {ele.status}
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => navigate(`/electionDetails/${ele._id}`)} // Call the handler
                  className="btn btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="election-category ">
          <h4>Ended</h4>
          {ended.map((ele, index) => (
            <div key={index} className="card bg-transparent mb-4">
              <div className="card-header">
                <h5>{ele.name}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Status:</strong> {ele.status}
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => navigate(`/electionDetails/${ele._id}`)} // Call the handler
                  className="btn btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Elections;
