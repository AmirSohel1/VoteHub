import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../services/api";
import "./AllVoter.css";
function AllVoter() {
  const [users, setUsers] = useState([]);

  const fetchAllVoters = async () => {
    try {
      const response = await axios.get("/user/allVoter");
      setUsers(response.data.voters);
    } catch (err) {
      console.error("Error fetching voters:", err);
    }
  };

  useEffect(() => {
    fetchAllVoters();
  }, []);

  return (
    <div className="container_voter">
      <div className="container_table">
        <h3>
          All Voters <hr />
        </h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Voter ID</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.voterId}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllVoter;
