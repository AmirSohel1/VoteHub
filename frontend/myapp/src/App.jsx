import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import VoterRoute from "./routes/VoterRoute";
import VoterDash from "./voterPages/VoterDash";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import AdminWindow from "./adminPages/AdminWindow";
import ElectionDetailsPage from "./voterPages/ElectionDetailsPage";
function App() {
  return (
    <div className="app_container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<AdminDash />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/voter-dashboard/*"
          element={
            <VoterRoute>
              <VoterDash />
            </VoterRoute>
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <AdminRoute>
              <AdminWindow />
            </AdminRoute>
          }
        />
        <Route path="/electionDetails/:id" element={<ElectionDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
