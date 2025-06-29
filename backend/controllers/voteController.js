const vote = require("../model/Vote");
const User = require("../model/user");
const election = require("../model/Elections");
// cast a vote

const castVote = async (req, res) => {
  const { electionId, voterId, candidateId } = req.body;
  try {
    // Validate input fields
    if (!electionId || !voterId || !candidateId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the election exists and is ongoing
    const electionsDoc = await election.findById(electionId);
    if (!electionsDoc) {
      return res.status(400).json({ message: "Election does not exist" });
    }
    if (electionsDoc.status !== "Ongoing") {
      return res.status(400).json({
        message: "Cannot cast vote. The election is not ongoing.",
      });
    }

    // Check if the voter exists and has a userType of "Voter"
    const voterDoc = await User.findById(voterId);
    if (!voterDoc) {
      return res.status(400).json({ message: "Voter not found" });
    }
    if (voterDoc.userType !== "Voter") {
      return res
        .status(400)
        .json({ message: "You are not a voter. Please contact the admin." });
    }

    // Check if the voter has already cast a vote in the current election
    const existingVote = await vote.findOne({ voterId, electionId });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }

    // If no existing vote, proceed to create a new vote
    const newVote = await vote.create({
      electionId,
      voterId,
      candidateId,
      createdAt: new Date(),
    });

    // Return the success message and created vote data
    res.status(201).json({
      message: "Vote cast successfully!",
      vote: newVote,
    });
  } catch (err) {
    res.status(400).json({ message: "Error: " + err.message });
  }
};

// get All votes

const getAllVotes = async (req, res) => {
  try {
    const votes = await vote.find();
    res.status(200).json(votes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get vote  by elections

const getVoteByElection = async (req, res) => {
  const { electionId } = req.params;
  try {
    const votes = await vote.find({ electionId });
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get votes by voter
const getVotesByVoter = async (req, res) => {
  const { voterId } = req.params;

  try {
    const votes = await vote.find({ voterId });
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  castVote,
  getAllVotes,
  getVoteByElection,
  getVotesByVoter,
};
