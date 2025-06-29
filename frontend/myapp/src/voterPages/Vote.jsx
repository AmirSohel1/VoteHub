import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [election, setElection] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const voterId = localStorage.getItem("id");

  const fetchElectionDetails = async () => {
    try {
      const response = await axios.get(`/election/id/${id}`);
      setElection(response.data);

      const candidateIds = response.data.candidates || [];
      if (candidateIds.length > 0) {
        const res = await axios.post("/user/candidates", {
          candidateIds,
        });
        setCandidates(res.data.candidates || []);
      }
    } catch (error) {
      console.error("Error fetching election or candidate details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectionDetails();
  }, [id]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate before casting your vote.");
      return;
    }

    try {
      const response = await axios.post("/vote/cast", {
        voterId,
        electionId: election._id,
        candidateId: selectedCandidate,
      });
      setConfirmation(response.data.message || "Vote successfully cast!");
    } catch (err) {
      console.error("Error casting vote:", err);
      setConfirmation("Error casting vote. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="cast-vote-card">
      <h3>Cast Your Vote</h3>

      <div className="election-details">
        <h4>Election Details</h4>
        {election.name ? (
          <>
            <p>
              <strong>Name:</strong> {election.name}
            </p>
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
          </>
        ) : (
          <p>No election details available.</p>
        )}
      </div>

      <div className="voter-details">
        <h4>Voter Details</h4>
        <p>
          <strong>Voter ID:</strong> {voterId}
        </p>
      </div>

      <div className="candidates">
        <h4>Candidates</h4>
        {candidates.map((candidate) => (
          <div key={candidate._id} className="candidate">
            <input
              type="radio"
              name="candidate"
              value={candidate.id}
              id={`candidate-${candidate._id}`}
              onChange={() => {
                // console.log(candidate);
                setSelectedCandidate(candidate._id);
              }}
            />
            <label htmlFor={`candidate-${candidate._id}`}>
              {candidate.name || `Candidate ID: ${candidate._id}`}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleVote} className="btn btn-primary">
        Cast Vote
      </button>

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
}

export default Vote;
