// import upload from "../middlewares/multer.middleware.js";
import path from "path";
import multer from "multer";
// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files to 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// File filter (optional: only allow images)
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

// Multer middleware for avatar and coverImage fields
const upload = multer({ storage, fileFilter });

export { upload };