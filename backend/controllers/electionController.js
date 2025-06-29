const election = require("../model/Elections");

// Create new election
const createElection = async (req, res) => {
  const { name, description, startDate, endDate, candidates } = req.body;
  try {
    // Check if election with the same name already exists
    const existingElection = await election.findOne({ name });
    if (existingElection) {
      return res
        .status(400)
        .json({ message: "Election already exists, please change name" });
    }

    // Create a new election document
    const elections = await election.create({
      name,
      description,
      startDate,
      endDate,
      candidates,
      createdBy: req.user.id,
    });

    res.status(201).json({
      id: elections._id,
      name: elections.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all elections and update status
const getElection = async (req, res) => {
  try {
    const elections = await election.find(); // Ensure 'election' is properly imported

    // Update all elections status
    for (const index of elections) {
      // Use 'for...of' for async operations
      try {
        const currentElection = await election.findById(index._id); // Retrieve each election
        if (currentElection) {
          await currentElection.updateElectionStatus(); // Assuming this function updates the status
          console.log("Election status updated:", currentElection.status);
        }
      } catch (err) {
        console.error("Error updating election status:", err);
      }
    }

    res.status(200).json(elections);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getElectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const ele = await election.findOne({ _id: id });
    if (!ele) {
      return res.status(400).json({ message: "not founded" });
    }
    res.status(200).json(ele);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createElection, getElection, getElectionById };
