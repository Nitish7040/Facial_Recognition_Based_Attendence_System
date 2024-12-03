const Attendance = require('../models/attendance');
const { recognizeFaceFromImage } = require('../utils/faceRecognition');

exports.takeAttendance = async (req, res) => {
    const { faceImage } = req.body;  // base64 or image path

    try {
        // Use the face recognition function to match the image
        const userEmbedding = await recognizeFaceFromImage(faceImage);

        if (!userEmbedding) {
            return res.status(400).json({ error: 'No face detected' });
        }

        // Compare the detected embedding with the stored embeddings in DB (e.g., MongoDB)
        // For simplicity, assuming the database stores embeddings

        const user = await User.findOne({ 'faceEmbedding': userEmbedding });
        if (user) {
            // Mark attendance
            const attendance = new Attendance({ userId: user._id, timestamp: Date.now() });
            await attendance.save();
            res.status(200).json({ message: 'Attendance marked' });
        } else {
            res.status(400).json({ error: 'User not recognized' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error during attendance marking' });
    }
};
