const jwt = require("jsonwebtoken");
const User = require("../model/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Toknen", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decode payLoad: ", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User fetched: ", req.user);

      if (!req.user) {
        return req.status(401).json({ message: "User is not Found" });
      }
      next();
    } catch (error) {
      console.log("Authorization Middleware Error ", error.message);

      return res.status(401).json({
        message:
          error.name === "TokenExpiredError"
            ? "Token expired please Login in again."
            : "Authorization failed.",
      });
    }
  } else {
    res.status(401).json({ message: "not authorized, no token is provided" });
  }
};

module.exports = { protect };
