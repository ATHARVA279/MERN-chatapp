import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import GenToken from "../Utils/GenToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, username, password, gender } = req.body;
    if (!fullName || !email || !username || !password || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.find({ username });

    if (user.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      GenToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    GenToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
