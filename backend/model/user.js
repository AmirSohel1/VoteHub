const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Validation for email format
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Admin", "Voter", "Candidate"], // Enforces allowed values
      default: "Candidate",
    },
    isVote: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for when the user is created
    },
    updatedAt: {
      type: Date,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"], // Minimum age for voting eligibility
    },
    voterId: {
      type: String,
      unique: true, // Unique identifier for voter
      sparse: true, // Allows this to be optional in cases of admin
    },
    candidateDetails: {
      partyName: {
        type: String,
        default: null,
      },
      manifesto: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.userType === "Voter" && !this.voterId) {
    // Generate current date in YYYYMMDD format
    const today = new Date();
    const datePart = `${today.getFullYear()}${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

    // Generate a 4-digit random number
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Create a unique voter ID
    this.voterId = `Voter-${datePart}-${randomNumber}`;
  }

  // Update the 'updatedAt' field
  this.updatedAt = Date.now();
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
