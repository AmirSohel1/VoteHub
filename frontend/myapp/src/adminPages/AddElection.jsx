import React, { useEffect, useState } from "react";
import { useAuth } from "../context/VoterAuth";
import Select from "react-select";
import axios from "../../services/api";
import "./AddElection.css";
function AddElection() {
  const { candidates } = useAuth(); // Assuming this fetches all candidate details
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    candidateIds: [], // Stores selected candidate IDs
  });

  const handleCandidateSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prevState) => ({
      ...prevState,
      candidateIds: selectedOptions,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/election/createElection", formData);
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        candidateIds: [],
      });
    } catch (err) {}
    console.log("Voting Data Submitted:", formData);
  };

  return (
    <div className="container_main">
      <h2>
        Create Election <hr />
      </h2>
      <form className="form_box" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Election Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Select Candidates</label>
          <Select
            options={candidates.map((candidate) => ({
              value: candidate._id,
              label: `${candidate.name} (${
                candidate.candidateDetails.partyName || "No Party"
              })`,
            }))}
            isMulti
            onChange={(selectedOptions) => {
              const selectedIds = selectedOptions.map((option) => option.value);
              setFormData((prevState) => ({
                ...prevState,
                candidateIds: selectedIds,
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Election
        </button>
      </form>
    </div>
  );
}

export default AddElection;
