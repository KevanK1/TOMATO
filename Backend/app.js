const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getConnection = require("./config/dbConnection")
const User = require("./model/model"); // User model

// getConnection()
const app = express();
const PORT = 3000;
const JWT_SECRET = "your_secret_key"; // Use environment variables in production

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON parser

// Route: Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists." });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();
  // or => User.create({ name, email, password});
  res.status(201).json({ msg: "Registration successful." });
});

// Route: Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "Account not found. Please register." });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ msg: "Login successful.", token });
});

// JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token missing. Access denied." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token." });
    req.user = user;
    next();
  });
};

// Protected Route Example
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ msg: "Access granted to protected route.", user: req.user });
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
