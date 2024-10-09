const Assignment = require("../models/assignment");
const User = require("../models/user");

// View all assignments tagged to the admin
const viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id }).populate(
      "userId",
      "name"
    );
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Accept an assignment
const acceptAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { status: "Accepted" },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment accepted", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reject an assignment
const rejectAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { status: "Rejected" },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment rejected", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { viewAssignments, acceptAssignment, rejectAssignment };
