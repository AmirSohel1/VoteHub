import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../services/api";
import { useAuth } from "../context/VoterAuth";
import "./AllVoter.css";

function AllCandidate({ children }) {
  const { set } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchAllCandidate = async () => {
    try {
      const response = await axios.get("/user/allCandidate");
      setUsers(response.data.candidates);
      set(response.data.candidates);
      // console.log(response.data.candidates);
    } catch (err) {
      console.error("Error fetching voters:", err);
    }
  };

  useEffect(() => {
    fetchAllCandidate();
  }, []);

  return (
    <div className="container_voter ">
      <div className="container_table">
        <h3>All Candidate</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Party</th>
              <th>Manifesto</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.candidateDetails.partyName}</td>
                <td>{user.age}</td>
                <td>-</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllCandidate;
