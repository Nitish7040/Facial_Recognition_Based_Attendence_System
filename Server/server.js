const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const attendanceRoutes = require('./routes/attendanceRoutes');
const connectDB = require('./config/dbConfig.js');
const multer = require('multer');

dotenv.config();

// Database connection
connectDB(); 

const app = express();

// Configure CORS
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Middleware to handle JSON requests
app.use(express.json());

// Set up multer storage for handling image upload (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Routes
app.use('/api/auth', upload.single('image'), authRoutes);
app.use('/api/attendance', attendanceRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
