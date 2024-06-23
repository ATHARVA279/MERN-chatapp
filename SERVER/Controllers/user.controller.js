import User from "../Models/User.js";

export const getUserforSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
