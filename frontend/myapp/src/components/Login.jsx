import React, { useState } from "react";
import axios from "../../services/api";
import { useAuth } from "../context/VoterAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginVoter } = useAuth(); // no need to pass null
  const { loginAdmin } = useAuth(); // no need to pass null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      // Make request to your backend for login
      const response = await axios.post("/user/login", formData);

      // Check the response to distinguish Admin and Voter
      if (response.data.userType === "Admin") {
        // Save to Admin context
        loginAdmin(response.data);
      } else if (response.data.userType === "Voter") {
        // Save to Voter context
        loginVoter(response.data);
      }

      // Reset form data on successful login
      setFormData({ email: "", password: "" });
      console.log("Logged in successfully!");
      localStorage.setItem("id", response.data.id);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Log In</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
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
            className="btn btn-primary w-100"
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
