const {
  createElection,
  getElection,
  getElectionById,
} = require("../controllers/electionController");
const { protect } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/createElection", protect, createElection);

router.get("/allElection", protect, getElection);
router.get("/id/:id", protect, getElectionById);

module.exports = router;
