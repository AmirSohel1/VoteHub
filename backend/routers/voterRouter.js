const express = require("express");
const router = express.Router();

const voteController = require("../controllers/voteController");
const { protect } = require("../middleware/auth");

router.post("/cast", protect, voteController.castVote);
router.get("/", protect, voteController.getAllVotes);
router.get("/election/:electionId", protect, voteController.getVoteByElection);
router.get("/voter/:voterId", protect, voteController.getVotesByVoter);

module.exports = router;
