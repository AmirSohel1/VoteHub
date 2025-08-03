import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for createRoot
import App from "./App.jsx";
import { AuthProvider } from "./context/VoterAuth.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

// Use createRoot to render the application. This is the modern way in React 18.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
