const faceapi = require('face-api.js');
const canvas = require('canvas');

// Load face-api.js models (ensure the models are available in the correct path)
const MODEL_PATH = './models'; // Make sure models are placed in this folder or update the path

// Initialize face-api.js with the required models
async function loadModels() {
    try {
        console.log('Loading models...');
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
        console.log('Models loaded successfully');
    } catch (err) {
        console.error('Error loading models:', err);
        throw new Error('Failed to load face-api.js models');
    }
}

// Generate face embedding from an image buffer
const generateFaceEmbedding = async (imageBuffer) => {
    try {
        // Ensure models are loaded before processing
        await loadModels();

        console.log('Processing face image...');
        // Convert image buffer to a canvas image
        const image = await canvas.loadImage(imageBuffer);

        // Detect a face and generate the embedding
        const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

        if (!detections) {
            console.error('No face detected in the image');
            throw new Error('No face detected in the image');
        }

        // Return the face descriptor (embedding)
        return detections.descriptor;
    } catch (err) {
        console.error('Error in generateFaceEmbedding:', err);
        throw new Error(`Face processing failed: ${err.message}`);
    }
};

module.exports = { generateFaceEmbedding };
