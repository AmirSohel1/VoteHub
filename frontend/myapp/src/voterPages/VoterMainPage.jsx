import React from "react";
import Elections from "./Elections";

/**
 * VoterMainPage Component
 * This component serves as the main landing page for the voter dashboard.
 * It's a simple container that renders the list of elections.
 * The styling is designed to be consistent with the rest of the application's
 * dark theme using Tailwind CSS.
 */
function VoterMainPage() {
  return (
    <div className="p-4 md:p-8">
      <Elections />
    </div>
  );
}

export default VoterMainPage;
