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

// app.get('/api/account', async (req, res) => {
//   try {
//     const { email } = req.query;

//     // Validate the email parameter
//     if (!email) {
//       return res.status(400).json({ error: 'Email is required to fetch account details' });
//     }

//     // Find the user by email (you can adjust this according to your database query method)
//     const user = await User.findOne({ email }); // Ensure this query matches your DB setup

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with the user's account details
//     res.status(200).json({
//       success: true,
//       data: {
//         name: `${user.firstName} ${user.lastName}`,  // Combined name (adjust fields as needed)
//         email: user.email,
//         phone: user.phone || "N/A",  // Include default value if no phone exists
//         address: {
//           street: user.address.street || "N/A",  // Default to "N/A" if not available
//           city: user.address.city || "N/A",
//           state: user.address.state || "N/A",
//           zip: user.address.zip || "N/A",
//           country: user.address.country || "N/A",
//         },
//         orders: user.orders || [],  // Include order history, ensure this is an array in your schema
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching account details:', error);
//     res.status(500).json({ error: 'An error occurred while fetching account details' });
//   }
// });

app.post('/api/get-email', (req, res) => {
  try {
    const token = req.headers['authorization']; // Get token from headers

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    if (!email) {
      return res.status(400).json({ error: 'Email not found in token' });
    }

    // Send back the email
    res.status(200).json({ email });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

app.post('/api/account', async (req, res) => {
  try {
    // Extract the email from the request headers
    const email = req.headers['email']; // This gets the 'Email' header from the request

    // Validate that the email is provided
    if (!email) {
      return res.status(400).json({ error: 'Email is required in the headers to fetch account details' });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email }); // Assuming you are using MongoDB and Mongoose

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's account details
    res.status(200).json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`, // Combine first and last name
        email: user.email,
        phone: user.phone || 'N/A', // If phone is not available, return 'N/A'
        address: {
          street: user.address?.street || 'N/A',
          city: user.address?.city || 'N/A',
          state: user.address?.state || 'N/A',
          zip: user.address?.zip || 'N/A',
          country: user.address?.country || 'N/A',
        },
        orders: user.orders || [], // Orders history, can be empty array if no orders
      },
    });
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ error: 'An error occurred while fetching account details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
