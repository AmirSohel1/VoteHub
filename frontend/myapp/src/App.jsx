import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute"; // Using the enhanced PrivateRoute
import VoterDash from "./voterPages/VoterDash";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminWindow from "./adminPages/AdminWindow";
import ElectionDetailsPage from "./voterPages/ElectionDetailsPage";
import React from "react";
function App() {
  return (
    <div className="app_container min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginForm />} />

        {/* Use the new PrivateRoute component for protected routes */}
        <Route
          path="/voter-dashboard/*"
          element={
            <PrivateRoute role="voter">
              <VoterDash />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoute role="admin">
              <AdminWindow />
            </PrivateRoute>
          }
        />

        {/* This route is for displaying election details and can be accessed by any logged-in user, voter, or admin. It can also be unprotected if you wish. */}
        <Route path="/electionDetails/:id" element={<ElectionDetailsPage />} />

        {/* Add a catch-all route for unmatched URLs */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
