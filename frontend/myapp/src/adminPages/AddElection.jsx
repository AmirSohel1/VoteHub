import React, { useEffect, useState } from "react";
// Assuming the useAuth hook is correctly implemented
import { useAuth } from "../context/VoterAuth";
import Select from "react-select";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

/**
 * AddElection Component
 * Allows an administrator to create a new election.
 * Features a modern, dark-themed UI with Tailwind CSS.
 */
function AddElection() {
  // Assuming this fetches all candidate details.
  // The original code had `const { candidates } = useAuth();`
  // I'll simulate this with a state for demonstration.
  const [candidates, setCandidates] = useState([]);
  const { allCandidates } = useAuth(); // Assuming this context exists

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    candidateIds: [],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for fetching all candidates on mount
  useEffect(() => {
    // You would replace this with your actual API call.
    // For now, using mock data.
    const mockCandidates = [
      {
        _id: "c1",
        name: "Jane Doe",
        candidateDetails: { partyName: "Progressive Party" },
      },
      {
        _id: "c2",
        name: "John Smith",
        candidateDetails: { partyName: "Innovators Alliance" },
      },
      {
        _id: "c3",
        name: "Emily White",
        candidateDetails: { partyName: "Green Future Party" },
      },
    ];
    setCandidates(mockCandidates);
    // You could also fetch from your context if it's already there
    // if (allCandidates) {
    //     setCandidates(allCandidates);
    // }
  }, []);

  /**
   * Handles changes to the form inputs and updates the state.
   * @param {object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission for creating a new election.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);
    try {
      // Placeholder for the actual API call
      // const response = await axios.post("/election/createElection", formData);

      // Simulate a successful API response
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Election created successfully!");

      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        candidateIds: [],
      });
    } catch (err) {
      setError("Error creating election. Please try again.");
      console.error("Error occurred:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styles for react-select to match the dark theme
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#1f2937", // dark:bg-gray-700
      borderColor: "#4b5563", // dark:border-gray-600
      color: "#ffffff", // dark:text-white
      boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : provided.boxShadow,
      "&:hover": {
        borderColor: "#4f46e5", // focus:border-indigo-500
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937", // dark:bg-gray-700, dark:hover:bg-gray-600
      color: "#ffffff", // dark:text-white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // dark:bg-gray-700
      borderColor: "#4b5563", // dark:border-gray-600
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4f46e5", // indigo-600
      color: "#ffffff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#d1d5db", // gray-300
      ":hover": {
        backgroundColor: "#374151", // gray-700
        color: "#ffffff",
      },
    }),
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Create Election
          <hr className="mt-2 w-24 mx-auto border-t-2 border-indigo-500" />
        </h2>

        {/* Success Message Box */}
        {message && (
          <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6 text-center animate-fade-in">
            {message}
          </div>
        )}
        {/* Error Message Box */}
        {error && (
          <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 text-center animate-fade-in">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Election Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Election Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Select Candidates */}
          <div>
            <label
              htmlFor="candidates"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Candidates
            </label>
            <Select
              options={candidates.map((candidate) => ({
                value: candidate._id,
                label: `${candidate.name} (${
                  candidate.candidateDetails.partyName || "No Party"
                })`,
              }))}
              isMulti
              className="mt-1"
              styles={selectStyles} // Apply custom styles
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                setFormData((prevState) => ({
                  ...prevState,
                  candidateIds: selectedIds,
                }));
              }}
            />
          </div>

          {/* Start Date Input */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* End Date Input */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              End Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Election"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddElection;
