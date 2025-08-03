import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Assuming you have a separate CSS file for global styles, no custom CSS is needed here.

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * BarByAge Component
 * Displays a bar chart showing voter distribution by age group.
 * The UI is styled with Tailwind CSS to match the dark theme.
 */
const BarByAge = () => {
  // State for voter data, including age groups and counts
  const [voterData, setVoterData] = useState({
    ageGroups: ["18-25", "26-35", "36-45", "46-60", "60+"],
    voterCounts: [50, 120, 75, 40, 30],
  });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to simulate an API call for data fetching
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock the fetched data
      setVoterData({
        ageGroups: ["18-25", "26-35", "36-45", "46-60", "60+"],
        voterCounts: [60, 150, 80, 50, 40],
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  // Configuration for the chart's data
  const data = {
    labels: voterData.ageGroups,
    datasets: [
      {
        label: "Voter Distribution by Age",
        data: voterData.voterCounts,
        backgroundColor: [
          "rgba(79, 70, 229, 0.7)", // indigo-600
          "rgba(124, 58, 237, 0.7)", // violet-600
          "rgba(236, 72, 153, 0.7)", // pink-600
          "rgba(251, 146, 60, 0.7)", // orange-500
          "rgba(34, 197, 94, 0.7)", // green-500
        ],
        borderColor: [
          "rgba(79, 70, 229, 1)",
          "rgba(124, 58, 237, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(251, 146, 60, 1)",
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
        text: "Voter Distribution by Age",
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
          text: "Age Groups",
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
        Voter Distribution by Age
      </h4>
      <div className="relative w-full h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarByAge;
