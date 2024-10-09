const express = require("express");
const router = express.Router();
const {
  viewAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authmiddleware");

router.get("/assignments", protect, viewAssignments);
router.post("/assignments/:id/accept", protect, acceptAssignment);
router.post("/assignments/:id/reject", protect, rejectAssignment);

module.exports = router;
