import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// // Managing the .env file
dotenv.config();

// Get the MONGODB_URI from the .env file
const { MONGODB_URI } = process.env;

// Connect to the MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB
        const conn = await mongoose.connect(MONGODB_URI);
        // Log the connection host if the connection is successful
        console.log(`<< MongoDB Connected: ${conn.connection.host} >>`.bgGreen.white);
    } catch (error) {
        // Log the error message if the connection is failed
        console.error(":: Database Not Connected".underline.red);
    }
};

export default connectDB;