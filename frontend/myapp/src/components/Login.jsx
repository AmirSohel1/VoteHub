import React, { useState } from "react";
// Assuming axios is correctly imported and configured in your project
import axios from "../../services/api";
// Assuming the useAuth hook is correctly implemented
import { useAuth } from "../context/VoterAuth";

/**
 * LoginForm Component
 * Handles user login for both voters and administrators.
 * Features a modern, dark-themed UI with Tailwind CSS.
 */
const LoginForm = () => {
  // State to manage form data for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // States for displaying error messages and loading status
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the login functions from the authentication context
  const { loginVoter, loginAdmin } = useAuth();

  // Key for local storage to save the user ID
  const userIdKey = "userId";

  /**
   * Handles changes to form inputs.
   * @param {object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the form submission for user login.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      // Make request to the backend for login
      const response = await axios.post("/user/login", formData);

      // Check the response to distinguish between Admin and Voter
      if (response.data.userType === "Admin") {
        loginAdmin(response.data);
      } else if (response.data.userType === "Voter") {
        loginVoter(response.data);
      }

      // Save user ID to local storage
      localStorage.setItem(userIdKey, response.data.id);

      // Reset form data on successful login
      setFormData({ email: "", password: "" });
      console.log("Logged in successfully!");
    } catch (err) {
      // Display a user-friendly error message if login fails
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-300 dark:border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Log In
          <hr className="mt-2 w-16 mx-auto border-t-2 border-indigo-500" />
        </h3>

        {/* Error message box */}
        {error && (
          <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 text-center animate-fade-in">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
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
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
