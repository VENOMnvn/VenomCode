const multer = require('multer');

// Configure Multer
const storage = multer.memoryStorage(); // You can choose your own storage configuration
const upload = multer({ storage: storage });

module.exports={upload}

