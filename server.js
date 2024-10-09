const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");

// Route imports
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Environment Variables Configuration
dotenv.config();

// Database Connection
connectDB();

const app = express();

// Middleware for JSON Parsing
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
