import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const GenToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("token", token, { expiresIn: "1d", httpOnly: true });
};

export default GenToken;
