import React, { useState } from "react";
import axios from "../../services/api";
import "./AddCandidate.css";
const AddCandidiate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    partyName: "",
    manifesto: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.age ||
      !formData.gender ||
      !formData.partyName ||
      !formData.manifesto
    ) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/user/addCandidate", formData);
      setMessage("Candidate added successfully!");
      setError("");
      // console.log(response.data);
      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        partyName: "",
        manifesto: "",
      });
    } catch (err) {
      setMessage("");
      setError("Error adding voter. Please try again.");
      console.error("Error occurred:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container_main">
      <h2>
        Add Voter Details <hr />
      </h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="form_box" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="partyName" className="form-label">
            Party Name
          </label>
          <input
            type="text"
            className="form-control"
            id="partyName"
            name="partyName"
            value={formData.partyName}
            onChange={handleChange}
            placeholder="Enter your party name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="manifesto" className="form-label">
            Manifesto
          </label>
          <textarea
            className="form-control"
            id="manifesto"
            name="manifesto"
            value={formData.manifesto}
            onChange={handleChange}
            placeholder="Enter your manifesto"
            rows="3"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCandidiate;
