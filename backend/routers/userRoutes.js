const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  addCandidate,
  addVoter,
  allVoter,
  allCandidate,
  findCandidatesbyId,
} = require("../controllers/userController");

// Admin routes
router.post("/registerAdmin", registerUser);

// Login route
router.post("/login", loginUser);

// Candidate route
router.post("/addCandidate", protect, addCandidate);

// Voter route
router.post("/addVoter", protect, addVoter);

// voter and candidate
router.get("/allVoter", protect, allVoter);

router.get("/allCandidate", protect, allCandidate);

router.post("/candidates", protect, findCandidatesbyId);

module.exports = router;
