const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getConnection = require("./config/dbConnection")
const User = require("./model/model"); // User model
const Order = require("./model/orderModel"); // Order model

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

// app.post('/placeorder', async (req, res) => {
//   try {
//     const { firstName, lastName, email, street, city, state, zip, country, phone, totalAmount } = req.body;

//     // Create a new order using the data from the client
//     const newOrder = new Order({
//       firstName,
//       lastName,
//       email,
//       street,
//       city,
//       state,
//       zip,
//       country,
//       phone,
//       totalAmount
//     });

//     // Save the order to the database
//     await newOrder.save();

//     // Respond with a success message
//     res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).send(error.toString());
//   }
// });


// Start Server

// In your backend (Node.js, Express)

app.post('/placeorder', async (req, res) => {
  const { firstName, lastName, email, street, city, state, zip, country, phone, cartItems, totalAmount } = req.body;

  try {
    // Save the order to the database
    const order = new Order({
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zip,
      country,
      phone,
      cartItems,  // This will be the array of cart items from the front-end
      totalAmount,
      createdAt: new Date(),
    });

    // Save the order to the database
    await order.save();

    // Respond with a success message
    res.status(200).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
