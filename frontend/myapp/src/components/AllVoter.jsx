import React, { useEffect, useState } from "react";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * AllVoter Component
 * Displays a list of all registered voters in a responsive, dark-themed table.
 * Fetches voter data from the API on component mount.
 */
function AllVoter() {
  // State for storing the list of voters
  const [users, setUsers] = useState([]);
  // State to handle the loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to handle any errors during data fetching
  const [error, setError] = useState(null);

  /**
   * Fetches all voter data from the API.
   */
  const fetchAllVoters = async () => {
    try {
      // Placeholder for the actual API call
      // const response = await axios.get("/user/allVoter");
      // Simulate a successful API response with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResponse = {
        data: {
          voters: [
            {
              _id: "v1",
              name: "Alice Johnson",
              email: "alice@example.com",
              age: 28,
              voterId: "VTR-1001",
              createdAt: "2024-07-25T08:00:00Z",
            },
            {
              _id: "v2",
              name: "Bob Williams",
              email: "bob@example.com",
              age: 35,
              voterId: "VTR-1002",
              createdAt: "2024-07-26T09:15:00Z",
            },
            {
              _id: "v3",
              name: "Charlie Brown",
              email: "charlie@example.com",
              age: 42,
              voterId: "VTR-1003",
              createdAt: "2024-07-27T10:30:00Z",
            },
          ],
        },
      };
      setUsers(mockResponse.data.voters);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching voters:", err);
      setError("Failed to fetch voters. Please try again later.");
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchAllVoters();
  }, []);

  // Display a loading message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading voters...</p>
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
      <div className="container mx-auto max-w-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          All Voters
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </h3>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Voter ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">{user.voterId}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllVoter;
