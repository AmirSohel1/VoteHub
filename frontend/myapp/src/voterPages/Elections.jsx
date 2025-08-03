import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * Elections Component
 * Displays a list of elections categorized into Ongoing, Upcoming, and Ended.
 * Features a modern, dark-themed UI with Tailwind CSS.
 */
function Elections() {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all elections from the API.
   */
  const fetchElections = async () => {
    try {
      setIsLoading(true);
      // Placeholder for the actual API call
      // const response = await axios.get("/election/allElection");
      // Simulate a successful API response with mock data
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResponse = {
        data: [
          {
            _id: "e1",
            name: "National Leadership Election",
            status: "Ongoing",
            startDate: "2024-07-01T00:00:00Z",
            endDate: "2024-08-30T00:00:00Z",
          },
          {
            _id: "e2",
            name: "Community Council Vote",
            status: "Upcoming",
            startDate: "2024-09-10T00:00:00Z",
            endDate: "2024-10-10T00:00:00Z",
          },
          {
            _id: "e3",
            name: "School Board Election",
            status: "Ended",
            startDate: "2024-05-15T00:00:00Z",
            endDate: "2024-06-15T00:00:00Z",
          },
          {
            _id: "e4",
            name: "Regional Senator Election",
            status: "Ongoing",
            startDate: "2024-07-20T00:00:00Z",
            endDate: "2024-09-20T00:00:00Z",
          },
        ],
      };
      setElections(mockResponse.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching elections:", err);
      setError("Failed to fetch elections. Please try again later.");
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchElections();
  }, []);

  /**
   * Classifies elections into three categories: Ongoing, Not Started, and Ended.
   * @param {Array} allElections - The list of all elections.
   * @returns {object} - An object containing the categorized and sorted election lists.
   */
  const classifyAndSortElections = (allElections) => {
    let ongoing = [];
    let notStarted = [];
    let ended = [];

    const now = new Date();

    allElections.forEach((ele) => {
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

  // Display a loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading elections...</p>
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
      <div className="container mx-auto max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          Elections
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ongoing Elections */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h4 className="text-2xl font-semibold text-center mb-6 text-green-600 dark:text-green-400">
              Ongoing
            </h4>
            <div className="space-y-6">
              {ongoing.length > 0 ? (
                ongoing.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                  >
                    <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {ele.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <strong className="font-semibold">Status:</strong>{" "}
                      <span className="font-bold text-xs py-1 px-2 rounded-full bg-green-500 text-white">
                        {ele.status}
                      </span>
                    </p>
                    <div className="mt-4 flex flex-col space-y-2">
                      <button
                        onClick={() => navigate(`/electionDetails/${ele._id}`)}
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`vote/${ele._id}`)}
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        Vote Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No ongoing elections at the moment.
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Elections */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h4 className="text-2xl font-semibold text-center mb-6 text-yellow-600 dark:text-yellow-400">
              Upcoming
            </h4>
            <div className="space-y-6">
              {notStarted.length > 0 ? (
                notStarted.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                  >
                    <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {ele.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <strong className="font-semibold">Status:</strong>{" "}
                      <span className="font-bold text-xs py-1 px-2 rounded-full bg-yellow-500 text-white">
                        Upcoming
                      </span>
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/electionDetails/${ele._id}`)}
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No upcoming elections.
                </p>
              )}
            </div>
          </div>

          {/* Ended Elections */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h4 className="text-2xl font-semibold text-center mb-6 text-red-600 dark:text-red-400">
              Ended
            </h4>
            <div className="space-y-6">
              {ended.length > 0 ? (
                ended.map((ele) => (
                  <div
                    key={ele._id}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                  >
                    <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {ele.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <strong className="font-semibold">Status:</strong>{" "}
                      <span className="font-bold text-xs py-1 px-2 rounded-full bg-red-500 text-white">
                        Ended
                      </span>
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/electionDetails/${ele._id}`)}
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No ended elections.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Elections;
