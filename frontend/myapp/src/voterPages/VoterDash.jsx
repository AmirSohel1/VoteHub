import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// Assuming the useAuth hook is correctly implemented
import { useAuth } from "../context/VoterAuth";
import VoterMainPage from "./VoterMainPage";
import Elections from "./Elections";
import ElectionDetailsPage from "./ElectionDetailsPage";
import Vote from "./Vote";

/**
 * VoterDash Component
 * This component serves as the main dashboard for a logged-in voter.
 * It includes a sidebar with voter details and a main content area
 * for displaying different pages via React Router.
 */
function VoterDash() {
  const { voter } = useAuth();
  const [user, setUser] = useState({});

  // This effect ensures the user state is updated when the voter context changes.
  // The dependency array is correct to prevent infinite loops.
  useEffect(() => {
    if (voter) {
      setUser(voter);
    }
  }, [voter]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Sidebar for Voter Details */}
      <aside className="w-full lg:w-1/4 p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-md lg:shadow-xl rounded-b-xl lg:rounded-r-2xl animate-fade-in transition-all duration-300">
        <div className="sticky top-8">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Voter Details
            <hr className="mt-2 w-16 border-t-2 border-indigo-500" />
          </h4>
          {user.name ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 transition-all duration-300">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {user.name}
              </h5>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
                <p>
                  <strong>Voter ID:</strong> {user.voterId}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Please log in to view your details.
            </p>
          )}

          {/* Navigation links */}
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/elections"
                  className="block py-2 px-4 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  All Elections
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content area for routed pages */}
      <main className="w-full lg:flex-1 p-4 lg:p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<VoterMainPage />} />
          <Route path="/elections" element={<Elections />} />
          {/* Re-adding the ElectionDetailsPage route as it's a necessary part of the flow */}
          <Route
            path="/electionDetails/:id"
            element={<ElectionDetailsPage />}
          />
          <Route path="/vote/:id" element={<Vote />} />
        </Routes>
      </main>
    </div>
  );
}

export default VoterDash;
