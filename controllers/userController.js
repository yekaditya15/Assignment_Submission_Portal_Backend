const User = require("../models/user");
const Assignment = require("../models/assignment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user or admin
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadAssignment = async (req, res) => {
  const { userId, task, admin } = req.body;

  try {
    // Find user and admin by email
    const user = await User.findOne({ email: userId });
    const adminUser = await User.findOne({ email: admin });

    if (!user || !adminUser) {
      return res.status(404).json({ message: "User or Admin not found" });
    }

    const assignment = new Assignment({
      userId: user._id, // Use the user's ObjectId
      task,
      admin: adminUser._id, // Use the admin's ObjectId
    });

    await assignment.save();
    res
      .status(201)
      .json({ message: "Assignment uploaded successfully", assignment });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Assignment validation failed", error: error.message });
  }
};

// Controller to fetch all admins
const getAllAdmins = async (req, res) => {
  try {
    // Find all users with the role of "admin"
    const admins = await User.find({ role: "admin" }).select("-password"); // Exclude the password field

    if (!admins) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, uploadAssignment, getAllAdmins };
