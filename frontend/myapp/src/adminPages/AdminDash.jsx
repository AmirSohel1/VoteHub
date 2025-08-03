import React, { useEffect, useState } from "react";
// Assuming BarByAge and BarChart components are implemented separately
import BarByAge from "../graphs/BarByAge";
import BarChart from "../graphs/BarChart";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * AdminDash Component
 * Displays a dashboard for administrators with key metrics and data visualizations.
 * Features a modern, dark-themed UI with Tailwind CSS.
 */
function AdminDash() {
  // State for total counts
  const [totalElections, setTotalElections] = useState(0);
  const [totalCandidate, setTotalCandidate] = useState(0);
  const [totalVoter, setTotalVoter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all dashboard data from the API.
   */
  const fetching = async () => {
    try {
      // Simulate a loading state for 1.5 seconds
      setIsLoading(true);
      setError(null);

      // Placeholder for the actual API calls
      // const elections_res = await axios.get("/election/allElection");
      // const cand_res = await axios.get("/user/allCandidate");
      // const voter_res = await axios.get("/user/allVoter");

      // Mocking the API responses for demonstration
      const mockElectionsResponse = { data: [{ _id: 1 }, { _id: 2 }] };
      const mockCandidatesResponse = {
        data: { candidates: [{ _id: 1 }, { _id: 2 }, { _id: 3 }] },
      };
      const mockVotersResponse = {
        data: {
          voters: [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }],
        },
      };

      // Update the state with the fetched data
      setTotalElections(mockElectionsResponse.data.length);
      setTotalCandidate(mockCandidatesResponse.data.candidates.length);
      setTotalVoter(mockVotersResponse.data.voters.length);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetching();
  }, []);

  // Display a loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading dashboard data...</p>
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Dashboard
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </h3>

        {/* Data Boxes Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Elections Card */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Total Elections
              </h4>
              <h5 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
                {totalElections}
              </h5>
            </div>
          </div>
          {/* Total Candidate Card */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Total Candidates
              </h4>
              <h5 className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-2">
                {totalCandidate}
              </h5>
            </div>
          </div>
          {/* Total Voter Card */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Total Voters
              </h4>
              <h5 className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mt-2">
                {totalVoter}
              </h5>
            </div>
          </div>
        </div>

        {/* Data Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <BarChart />
          </div>
          {/* Bar Chart by Age */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <BarByAge />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
