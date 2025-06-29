import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./BarChar.css";
const BarByAge = () => {
  const [voterData, setVoterData] = useState({
    ageGroups: ["18-25", "26-35", "36-45", "46-60", "60+"],
    voterCounts: [50, 120, 75, 40, 30],
  });

  useEffect(() => {
    // Simulate API call to fetch voter data by age
    // Update the state with the new data (as an example)
    setTimeout(() => {
      setVoterData({
        ageGroups: ["18-25", "26-35", "36-45", "46-60", "60+"],
        voterCounts: [60, 150, 80, 50, 40],
      });
    }, 2000); // After 2 seconds, mock the update of data
  }, []);

  const data = {
    labels: voterData.ageGroups, // Use the state variable for age groups
    datasets: [
      {
        label: "Voter Distribution by Age",
        data: voterData.voterCounts, // Use the state variable for the data
        backgroundColor: "rgba(38, 38, 38, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Voters",
        },
      },
      x: {
        title: {
          display: true,
          text: "Age Groups",
        },
      },
    },
  };

  return (
    <div className="container_by">
      <h4 className="text-center">
        Voter Distribution by Age <hr />
      </h4>
      <div style={{ width: "600px", height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarByAge;
