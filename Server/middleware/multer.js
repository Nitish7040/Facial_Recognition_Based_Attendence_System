const multer = require('multer');

// Configure multer for face image storage (memory storage for temporary storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Export upload middleware for use in the routes
module.exports = upload;
