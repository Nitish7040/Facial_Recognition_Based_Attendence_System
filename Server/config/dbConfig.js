const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the .env file");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI);

        console.log('Successfully connected to MongoDB'); 
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
