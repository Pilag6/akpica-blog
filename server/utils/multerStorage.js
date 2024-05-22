import multer from "multer";

// Multer Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const basename = file.originalname.replace(`.${ext}`, "");

    // Check if counts for basename exists, if not, initialize it to 0
    global.fileCounts = global.fileCounts || {};
    global.fileCounts[basename] = global.fileCounts[basename] || 0;

    // Increment count and generate filename
    global.fileCounts[basename]++;
    const count = global.fileCounts[basename];
    const newFilename =
      count === 1 ? file.originalname : `${basename}-${count}.${ext}`;

    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

export { upload };
