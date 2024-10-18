const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jwt
const cors= require('cors');

const User = require("./models/users");

const userRoutes = require("./routes/user")

const tourRoutes = require("./routes/tours");
const packageRoutes = require("./routes/package");
const emailRoutes = require('./routes/emailRoutes');

const App = express();
App.use(bodyParser.json());
App.use(cors());

const port = 5005;

app.use(cors({
  origin: ['https://thetrippingtales.com/', 'https://another-allowed-origin.com',],
  optionsSuccessStatus: 200,
}));
// Hello World Route
App.get('/', (req, res) => {
  res.send("Welcome tour APIS");
});

App.use("/User",userRoutes)
App.use("/Tour",tourRoutes)
App.use("/package",packageRoutes)
App.use("/api/emailRoutes", emailRoutes);


/*******Login Api*********/
App.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a token
    const token = jwt.sign({ id: user._id, email: user.email }, 'secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with your actual secret

    // If the password matches, the user is successfully logged in
    res.status(200).json({ message: 'Login successful', token }); // Send the token in the response

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MongoDB Connection and Server Start
mongoose.connect("mongodb+srv://alok1993:cV7GOXVnzuYmrEWf@cluster0.kzdim.mongodb.net/AuthDB", {})
  .then(() => {
    console.log('MongoDB connected');
    App.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(error => console.log(`MongoDB connection error: ${error.message}`));
