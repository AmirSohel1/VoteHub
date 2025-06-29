const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Load routes
const userRoutes = require("./routers/userRoutes");
const electionRoutes = require("./routers/electionRouter");
const voterRoutes = require("./routers/voterRouter");

app.use("/api/user", userRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/vote", voterRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is listening at port ${PORT}`));
