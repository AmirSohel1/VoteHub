import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register the necessary components for the Bar chart
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

/**
 * BarChart Component
 * Displays a bar chart showing voter distribution by gender.
 * The UI is styled with Tailwind CSS to match the dark theme.
 */
const BarChart = () => {
  // State for voter data, including labels and counts
  const [voterData, setVoterData] = useState({
    labels: ["Male Voters", "Female Voters", "Other Voters"],
    voterCounts: [300, 200, 50],
  });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to simulate an API call for data fetching
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock the fetched data
      setVoterData({
        labels: ["Male Voters", "Female Voters", "Other Voters"],
        voterCounts: [320, 210, 65],
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  // Configuration for the chart's data
  const data = {
    labels: voterData.labels,
    datasets: [
      {
        label: "Voter Data",
        data: voterData.voterCounts,
        backgroundColor: [
          "rgba(79, 70, 229, 0.7)", // indigo-600
          "rgba(236, 72, 153, 0.7)", // pink-600
          "rgba(34, 197, 94, 0.7)", // green-500
        ],
        borderColor: [
          "rgba(79, 70, 229, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Configuration for the chart's options and styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(209 213 219)", // dark:text-gray-300
        },
      },
      title: {
        display: true,
        text: "Voter Distribution by Gender",
        color: "rgb(209 213 219)", // dark:text-gray-300
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(107, 114, 128, 0.2)", // gray-500 with opacity
        },
        ticks: {
          color: "rgb(209 213 219)", // dark:text-gray-300
        },
        title: {
          display: true,
          text: "Number of Voters",
          color: "rgb(209 213 219)", // dark:text-gray-300
        },
      },
      x: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "rgb(209 213 219)", // dark:text-gray-300
        },
        title: {
          display: true,
          text: "Gender",
          color: "rgb(209 213 219)", // dark:text-gray-300
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <p className="text-gray-500 dark:text-gray-400">
          Loading chart data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h4 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
        Voter Distribution by Gender
      </h4>
      <div className="relative w-full h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
