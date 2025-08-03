import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * Vote Component
 * Allows a voter to cast a vote for a candidate in a specific election.
 * Features a modern, dark-themed UI with Tailwind CSS.
 */
function Vote() {
  // State for the list of candidates
  const [candidates, setCandidates] = useState([]);
  // State for the election details
  const [election, setElection] = useState({});
  // State for the currently selected candidate
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  // State for displaying confirmation or error messages
  const [confirmation, setConfirmation] = useState(null);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to track if a vote is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Get the election ID from the URL parameters
  const { id } = useParams();
  // Get the voter ID from local storage
  const voterId = localStorage.getItem("id");

  /**
   * Fetches election details and its associated candidates from the API.
   */
  const fetchElectionDetails = async () => {
    setLoading(true);
    try {
      // Fetch election details
      // const response = await axios.get(`/election/id/${id}`);
      // setElection(response.data);
      const mockElectionResponse = {
        data: {
          _id: id,
          name: "National Leadership Election",
          description: "Vote for the future leader of our nation.",
          startDate: "2024-07-01T00:00:00Z",
          endDate: "2024-08-30T00:00:00Z",
          candidates: ["c1", "c2", "c3"],
        },
      };
      setElection(mockElectionResponse.data);

      // Fetch candidate details
      const candidateIds = mockElectionResponse.data.candidates || [];
      if (candidateIds.length > 0) {
        // const res = await axios.post("/user/candidates", { candidateIds });
        const mockCandidatesResponse = {
          data: {
            candidates: [
              { _id: "c1", name: "Jane Doe" },
              { _id: "c2", name: "John Smith" },
              { _id: "c3", name: "Emily White" },
            ],
          },
        };
        setCandidates(mockCandidatesResponse.data.candidates || []);
      }
    } catch (error) {
      console.error("Error fetching election or candidate details:", error);
      setConfirmation("Failed to load election details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts or 'id' changes
  useEffect(() => {
    fetchElectionDetails();
  }, [id]);

  /**
   * Handles the vote submission.
   */
  const handleVote = async () => {
    if (!selectedCandidate) {
      setConfirmation("Please select a candidate before casting your vote.");
      return;
    }

    setIsSubmitting(true);
    setConfirmation(null); // Clear previous confirmation messages
    try {
      // const response = await axios.post("/vote/cast", {
      //     voterId,
      //     electionId: election._id,
      //     candidateId: selectedCandidate,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Assuming the API returns a success message
      setConfirmation("Vote successfully cast! Thank you for participating.");
    } catch (err) {
      console.error("Error casting vote:", err);
      setConfirmation("Error casting vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="w-full max-w-4xl p-8 mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Cast Your Vote
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </h3>

        {/* Displaying confirmation message */}
        {confirmation && (
          <div
            className={`p-4 rounded-lg mb-6 text-center animate-fade-in ${
              confirmation.includes("successfully")
                ? "bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200"
            }`}
          >
            {confirmation}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Election Details Card */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md border border-gray-300 dark:border-gray-600">
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Election Details
            </h4>
            {election.name ? (
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
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
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No election details available.
              </p>
            )}
          </div>

          {/* Voter Details Card */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md border border-gray-300 dark:border-gray-600">
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Voter Details
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Voter ID:</strong> {voterId ? voterId : "N/A"}
            </p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
          <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Candidates
          </h4>
          <div className="space-y-4">
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedCandidate === candidate._id
                      ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-500 dark:border-indigo-400"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedCandidate(candidate._id)}
                >
                  <input
                    type="radio"
                    id={`candidate-${candidate._id}`}
                    name="candidate"
                    value={candidate._id}
                    checked={selectedCandidate === candidate._id}
                    onChange={() => setSelectedCandidate(candidate._id)}
                    className="hidden" // Hide the default radio button
                  />
                  <label
                    htmlFor={`candidate-${candidate._id}`}
                    className="w-full flex items-center justify-between text-lg font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 mr-3 ${
                          selectedCandidate === candidate._id
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-400 dark:border-gray-500"
                        }`}
                      ></div>
                      {candidate.name || `Candidate ID: ${candidate._id}`}
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No candidates available for this election.
              </p>
            )}
          </div>
        </div>

        {/* Cast Vote Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleVote}
            className="w-full md:w-auto py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !selectedCandidate}
          >
            {isSubmitting ? "Casting Vote..." : "Cast Vote"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vote;
