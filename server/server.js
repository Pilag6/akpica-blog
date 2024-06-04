import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Managing the .env file
dotenv.config();

// Import the connectDB function
import connectDB from "./config/connectDB.js";
// Connect to the MongoDB
await connectDB();

// Importing the Router
import postsRouter from "./routes/postsRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import noteRouter from "./routes/noteRouter.js";

// Importing the Error Handler Middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Create an express app
const app = express();
const { PORT } = process.env;

app.set("trust proxy", 1);
// Middleware that allows browsers to accept data from this server
app.use(
    cors({
        // add many options here
        // origin: ["http://localhost:5173", "http://localhost:4173", "https://akpicablog.netlify.app", "https://akpica-blog.netlify.app", "https://akpica-blog-1.onrender.com"],
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: [
            "Access-Control-Allow-Origin",
            "Content-Type",
            "Authorization"
        ],
        exposedHeaders: 'Set-Cookie',

    })
);
// Middlewares that accepts urlencoded from data request
app.use(express.urlencoded({ extended: true }));
// Middleware that accepts json format data request
app.use(express.json());
// Middleware that logs the request to the console
app.use(morgan("dev"));
// Middleware that parses cookies
app.use(cookieParser());

// ROUTERS
app.use("/posts", postsRouter);
app.use("/", AuthRouter);
app.use("/notes", noteRouter);

// Error Handler Middleware
app.use(errorHandler);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.bgBlue.white);
});
