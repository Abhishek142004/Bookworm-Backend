const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(400)
        .json({ msg: "Token Not Found: Unauthorized Access" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); // Ensure this matches your environment variable name
    const userData = await User.findOne({ email: decoded.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    // return res.status(200).json({ userData });

    // Attach the decoded user info to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Invalid Token: Unauthorized Access" });
  }
};

module.exports = authMiddleware;
