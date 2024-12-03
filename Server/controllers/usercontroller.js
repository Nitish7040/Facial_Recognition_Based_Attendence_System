const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, mobile, password, confirmPassword, address, branch, year, admissionNo, erpId, image } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
    address,
    branch,
    year,
    admissionNo,
    erpId,
    image, // store image URL if provided
  });

  try {
    const user = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Add more functions (like login, etc.)

module.exports = { registerUser };

