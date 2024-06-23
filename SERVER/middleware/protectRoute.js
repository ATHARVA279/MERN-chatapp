import jwt from "jsonwebtoken";
import User from "../Models/User.js"; 

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("You need to be logged in to access this route");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("wrong password");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
