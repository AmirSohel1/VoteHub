import React, { useEffect, useState } from "react";
// Assuming axios is correctly imported and configured in your project
// import axios from "../../services/api";

// The useAuth hook from your context
// import { useAuth } from "../context/VoterAuth";

/**
 * AllCandidate Component
 * Displays a list of all candidates in a responsive, dark-themed table.
 * Fetches candidate data from the API on component mount.
 */
function AllCandidate() {
  // The original code used 'set', but it's not used in the return.
  // For now, we'll keep the state for the candidates list.
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all candidate data from the API.
   */
  const fetchAllCandidate = async () => {
    try {
      // Placeholder for the actual API call
      // const response = await axios.get("/user/allCandidate");
      // Simulate a successful API response with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResponse = {
        data: {
          candidates: [
            {
              _id: "c1",
              name: "Jane Doe",
              email: "jane.doe@example.com",
              age: 45,
              gender: "Female",
              candidateDetails: {
                partyName: "Progressive Party",
                manifesto: "Focus on education and healthcare.",
              },
              createdAt: "2024-07-25T10:00:00Z",
            },
            {
              _id: "c2",
              name: "John Smith",
              email: "john.smith@example.com",
              age: 52,
              gender: "Male",
              candidateDetails: {
                partyName: "Innovators Alliance",
                manifesto: "Economic growth and technology.",
              },
              createdAt: "2024-07-26T11:30:00Z",
            },
            {
              _id: "c3",
              name: "Emily White",
              email: "emily.white@example.com",
              age: 38,
              gender: "Female",
              candidateDetails: {
                partyName: "Green Future Party",
                manifesto: "Environmental sustainability and social justice.",
              },
              createdAt: "2024-07-27T12:45:00Z",
            },
          ],
        },
      };
      setUsers(mockResponse.data.candidates);
      // If you need to use the context, uncomment the following line
      // set(mockResponse.data.candidates);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Failed to fetch candidates. Please try again later.");
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchAllCandidate();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <p className="text-xl font-semibold">Loading candidates...</p>
      </div>
    );
  }

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
          All Candidates
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
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Party
                </th>
                <th scope="col" className="px-6 py-3">
                  Manifesto
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
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">
                    {user.candidateDetails.partyName}
                  </td>
                  <td className="px-6 py-4">
                    {user.candidateDetails.manifesto}
                  </td>
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

export default AllCandidate;
