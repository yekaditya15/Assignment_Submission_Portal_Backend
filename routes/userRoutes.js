const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  uploadAssignment,
  getAllAdmins,
} = require("../controllers/userController");

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

// User Login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginUser
);

// Upload Assignment
router.post(
  "/upload",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("task").notEmpty().withMessage("Task is required"),
    body("admin").notEmpty().withMessage("Admin ID is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  uploadAssignment
);

// Fetch all Admins
router.get("/admins", getAllAdmins);

module.exports = router;
