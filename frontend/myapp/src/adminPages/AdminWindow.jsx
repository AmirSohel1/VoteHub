import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
// Importing all necessary components
import AdminDash from "./AdminDash";
import AllCandidate from "../components/AllCandidate";
import AllVoter from "../components/AllVoter";
import AddCandidate from "../components/AddCandidiate"; // Corrected typo
import AddVoter from "../components/AddVoter";
import Elections from "../voterPages/Elections";
import AddElection from "./AddElection";

/**
 * AdminWindow Component
 * This component serves as the main layout for the admin dashboard,
 * featuring a sidebar for navigation and a main content area for
 * displaying different pages via React Router.
 */
function AdminWindow() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-1/4 p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-md lg:shadow-xl rounded-b-xl lg:rounded-r-2xl animate-fade-in transition-all duration-300">
        <div className="sticky top-8">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Navigation
            <hr className="mt-2 w-16 border-t-2 border-indigo-500" />
          </h4>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="voters"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  All Voters
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cands"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  All Candidates
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="add-cand"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Add Candidate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="add-vote"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Add Voter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="allElection"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Elections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="addElection"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Add Election
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full lg:flex-1 p-4 lg:p-8 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="voters" element={<AllVoter />} />
          <Route path="cands" element={<AllCandidate />} />
          <Route path="add-cand" element={<AddCandidate />} />
          <Route path="add-vote" element={<AddVoter />} />
          <Route path="allElection" element={<Elections />} />
          <Route path="addElection" element={<AddElection />} />
          {/* Catch-all route for the initial page or default view */}
          <Route path="*" element={<AdminDash />} />
        </Routes>
        {/* Removed the Outlet component as Routes handles all content */}
      </main>
    </div>
  );
}

export default AdminWindow;
