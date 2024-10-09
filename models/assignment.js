const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the assignment schema
const assignmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending", // New assignments will have "Pending" status by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Assignment model
const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
