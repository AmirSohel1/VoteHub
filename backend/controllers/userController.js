const User = require("../model/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, userType, age, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        message: "user is already register",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      userType,
      age,
      gender,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Check if the password matches
    const isPasswordMatch = await user.matchPassword(password); // Assuming this method is defined
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Send success response
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      voterId: user.voterId || "",
      userType: user.userType,
    });
  } catch (err) {
    console.error("Error logging in:", err.message); // Log error to the console
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const addCandidate = async (req, res) => {
  try {
    if (req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Admins can add candidates." });
    }

    const { name, email, age, gender, partyName, manifesto } = req.body;

    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ message: "Name, email, and age are required." });
    }

    const candidate = new User({
      name,
      email,
      password: "defaultPassword123", // Password should be securely generated
      userType: "Candidate",
      age,
      gender,
      candidateDetails: {
        partyName,
        manifesto,
      },
    });

    await candidate.save();
    return res
      .status(201)
      .json({ message: "Candidate added successfully.", candidate });
  } catch (error) {
    console.error("Error occurred while adding candidate:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

const addVoter = async (req, res) => {
  try {
    if (req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Admins can add voters." });
    }

    const { name, email, age, gender } = req.body;
    if (!name || !email || !age || !gender) {
      return res
        .status(400)
        .json({ message: "Name, email, and age are required." });
    }
    const voter = new User({
      name,
      email,
      gender,
      password: "defaultPassword123", // Password should be generated or input securely
      userType: "Voter",
      age,
    });
    await voter.save();
    res.status(201).json({ message: "Voter added successfully.", voter });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// fetching all voter
const allVoter = async (req, res) => {
  try {
    if (req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Admins can visit." });
    }
    const voters = await User.find({ userType: "Voter" });

    if (voters.length === 0) {
      return res.status(404).json({ message: "No voters registered." });
    }

    res.status(200).json({ voters });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};
// all candidate
const allCandidate = async (req, res) => {
  try {
    if (req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only Admins visit" });
    }
    const candidates = await User.find({ userType: "Candidate" });

    if (candidates.length === 0) {
      return res.status(404).json({ message: "No voters registered." });
    }

    res.status(200).json({ candidates });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

const findCandidatesbyId = async (req, res) => {
  const { candidateIds } = req.body; // Get candidate IDs from request body

  try {
    if (!candidateIds || !Array.isArray(candidateIds)) {
      return res.status(400).json({ message: "Invalid candidate IDs." });
    }

    // Find all candidates whose IDs are in the array
    const candidates = await User.find({ _id: { $in: candidateIds } });

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found." });
    }

    res.status(200).json({ candidates });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addVoter,
  addCandidate,
  allVoter,
  allCandidate,
  findCandidatesbyId,
};
