const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["Not Started", "Ongoing", "Ended"],
      default: "Not Started",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose.model("User").findById(value);
          return user && user.userType === "Admin";
        },
        message: "User must be an Admin to create an election.",
      },
    },
  },
  { timestamps: true }
);

electionSchema.methods.updateElectionStatus = async function () {
  const currentDate = new Date();

  if (currentDate < this.startDate) {
    this.status = "Not Started";
  } else if (currentDate >= this.startDate && currentDate <= this.endDate) {
    this.status = "Ongoing";
  } else if (currentDate > this.endDate) {
    this.status = "Ended";
  }
  await this.save();
};

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;
