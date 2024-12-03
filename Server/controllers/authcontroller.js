const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const sendEmail = require('../utils/nodemailer');
// Register User
exports.register = async (req, res) => {
    // console.log('Request Body:', req.body); // Log request body for debugging

    const { firstName, lastName, email, mobile, password, confirmPassword, address, Branch, year, admissionNo, erpId } = req.body;

    // Validate if any field is missing
    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword || !address || !Branch || !year || !admissionNo || !erpId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Check if user already exists by email or mobile
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or Mobile already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword,
            address,
            Branch,  // Ensure this matches the frontend request field name
            year,
            admissionNo,
            erpId,
        });

        // Save the new user
        const savedUser = await newUser.save();

        // Send email notification
        await sendEmail(
            email,
            'Registration Successful',
            `Successfully registered! ERP ID: ${erpId}, Password: ${password}`
        );

        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

exports.login = async (req, res) => {
    const { erpId, password } = req.body;

    try {
        const user = await User.findOne({ erpId });
        if (!user) {
            return res.status(400).json({ message: "ERP ID not found" });
          }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
          }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
};
