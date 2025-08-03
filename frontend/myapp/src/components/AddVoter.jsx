import React, { useState } from "react";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";

const AddVoter = () => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  // States for displaying success/error messages and loading status
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles changes to the form inputs and updates the state.
   * @param {object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Validates the form data before submission.
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.age ||
      !formData.gender
    ) {
      setError("All fields are required.");
      return false;
    }
    if (formData.age <= 0) {
      setError("Age must be a positive number.");
      return false;
    }
    // You could add more robust validation here, e.g., for email format.
    return true;
  };

  /**
   * Handles the form submission, sending data to the API.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Uncomment this line to make the actual API call when ready
      // const response = await axios.post("/user/addVoter", formData);

      // Simulate a successful API response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("Voter added successfully!");
      setError("");
      // Reset the form data after a successful submission
      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
      });
    } catch (err) {
      setMessage("");
      // Use the more robust error message from the user's code
      setError(
        err.response?.data?.message || "Error adding voter. Please try again."
      );
      console.error("Error occurred:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Add Voter Details
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
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Age Input */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Age
            </label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              min="1"
            />
          </div>

          {/* Gender Select */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gender
            </label>
            <select
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVoter;
