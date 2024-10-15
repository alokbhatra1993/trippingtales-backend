// Import user model
const User = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')

exports.signup= async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const userObj = {
      name,
      email,
      phone,
      password: hashedPassword
    };

    // Save the new user
    const newUser = new User(userObj);
    const saveUserQuery = await newUser.save();

    res.status(201).json(saveUserQuery);

  } catch (error) {
    console.error("Error in SignUp:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
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
};