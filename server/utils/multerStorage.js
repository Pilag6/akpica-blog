import multer from "multer";

// Multer Middleware
const storage = new multer.memoryStorage();


const upload = multer({ storage: storage });

export { upload };
