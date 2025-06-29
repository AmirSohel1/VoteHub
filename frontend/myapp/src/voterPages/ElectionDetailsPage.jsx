import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Ensure useParams is imported
import axios from "../../services/api";
import "./Elections.css";

function ElectionDetailsPage() {
  const [election, setElection] = useState(null);
  const { id } = useParams(); // This grabs the election ID from the URL
  const fetchElectionDetails = async () => {
    try {
      const link = `/election/id/${id}`;
      console.log(link);
      const response = await axios.get(link);
      setElection(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setElection(null); // Clear the previous data
    fetchElectionDetails();
  }, [id]);

  if (!election) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container_election mt-4">
      <div className="card bg-transparent">
        <div className="card-header">
          <h3>{election.name}</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Description:</strong> {election.description}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(election.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(election.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {election.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElectionDetailsPage;
