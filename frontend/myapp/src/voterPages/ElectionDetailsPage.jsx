import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * ElectionDetailsPage Component
 * Displays the details of a specific election.
 * Fetches election data from the API based on the URL parameter 'id'.
 */
function ElectionDetailsPage() {
  // State for storing the election data
  const [election, setElection] = useState(null);
  // State to handle the loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to handle any errors during data fetching
  const [error, setError] = useState(null);
  // Get the election ID from the URL parameters
  const { id } = useParams();

  /**
   * Fetches election details from the API using the provided ID.
   */
  const fetchElectionDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const link = `/election/id/${id}`;
      console.log(link);

      // Placeholder for the actual API call
      // const response = await axios.get(link);
      // Simulate a successful API response with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResponse = {
        data: {
          _id: id,
          name: "MyVote National Election 2024",
          description: "This election is for the national representatives.",
          startDate: "2024-08-01T00:00:00Z",
          endDate: "2024-09-01T00:00:00Z",
          status: "Active",
        },
      };
      setElection(mockResponse.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching election details:", err);
      setError("Failed to fetch election details. Please try again later.");
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts or 'id' changes
  useEffect(() => {
    setElection(null); // Clear previous data before fetching new data
    fetchElectionDetails();
  }, [id]); // Depend on 'id' to re-fetch when the URL parameter changes

  // Display a loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading election details...</p>
      </div>
    );
  }

  // Display an error message if data fetching fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="p-6 rounded-lg shadow-xl bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // Render the election details once data is available
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="container mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <div className="border-b dark:border-gray-700 pb-4 mb-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            {election.name}
          </h3>
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </div>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Description:
            </strong>{" "}
            {election.description}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Start Date:
            </strong>{" "}
            {new Date(election.startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              End Date:
            </strong>{" "}
            {new Date(election.endDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Status:
            </strong>{" "}
            <span
              className={`font-bold py-1 px-3 rounded-full text-xs ${
                election.status === "Active"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {election.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElectionDetailsPage;
