const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { resolve } = require("path");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("static"));

// Serve HTML page (if needed for frontend preview)
app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

// API Routes
app.use("/api", menuRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
