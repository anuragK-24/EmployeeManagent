const multer = require("multer");
const uploadController = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // Generate a unique name for the file
        let uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage: storage,
});

uploadController.post("/image", upload.single("image"), async (req, res) => {
    console.log("server file ", req.file);
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file in request.' });
        }
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while uploading the file.' });
    }
});

module.exports = uploadController;