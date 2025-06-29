import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./BarChar.css";

// Register the necessary components for the Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  // Data for the bar chart
  const data = {
    labels: ["Male Voters", "Female Voters", "Total Voters"], // Labels for the bars
    datasets: [
      {
        label: "Voter Data",
        data: [300, 200, 500], // Values for each bar (Male, Female, Total)
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Bar color
        borderColor: "rgb(0, 0, 0)", // Border color for the bars
        borderWidth: 1, // Width of the borders
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true, // This makes the chart responsive by default
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Makes sure the y-axis starts at 0
      },
    },
  };

  return (
    <div className="container_bar">
      <h4>
        Voter distribution by age <hr />
      </h4>
      <div style={{ width: "400px", height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
