const multer = require("multer");

//creating memory storage. Uploading data in memory
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

module.exports = upload;