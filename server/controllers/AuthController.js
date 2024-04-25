import UserModel from "../models/UserModel.js";
import asyncHandler from "../config/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

// Define the __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

// Multer Middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const splitFileName = file.originalname.split(".");
        // console.log(splitFileName); // [ 'photo', 'jpg' ]
        const extension = splitFileName[splitFileName.length - 1];
        const filename = `${
            splitFileName[0]
        }-${crypto.randomUUID()}.${extension}`;
        // console.log(filename); // photo-123456789.jpg
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Register a new user
const register = asyncHandler(async (req, res) => {
    // Destructure the request body
    const { username, email, password, fullname } = req.body;

    // Hash de password before saving in database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await UserModel.create({
        username,
        email,
        fullname,
        password: hashedPassword
    });

    // If the user is created successfully
    if (user) {
        res.status(201).json({
            message: "User created successfully"
        });
    } else {
        // If the user is not created successfully
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const login = asyncHandler(async (req, res) => {
    // Destructure the request body
    const { username, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ username });

    // Check if the user is found
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the user is found
    if (isMatch) {
        // Create a token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // Create a cookie and set the token
        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true
        });

        // Send the token to the client
        res.status(200).json({
            message: "User logged in successfully"
        });
    } else {
        // If the user is not found
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });

    // Send the response
    res.status(200).json({
        message: "User logged out successfully"
    });
});

// Get all users
const admin = asyncHandler(async (req, res) => {
    const user = await UserModel.find();

    console.log(user);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "Welcome to the admin page",
        // Hide the password
        user: user.map((user) => {
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        })
    });
});

// GET /users/:username/photo
const userPhoto = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    const picturePath = "uploads/" + user.userpicture;
    const absolutePath = __dirname + "/" + picturePath;
    res.sendFile(absolutePath);
});

// Edit user
const editUser = asyncHandler(async (req, res) => {
    const { username, email, password, userpicture, fullname } = req.body;

    // Hash de password before saving in database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            username,
            email,
            password: hashedPassword,
            userpicture,
            fullname
        },
        {
            new: true
        }
    );

    console.log(req.body);
    console.log("Password", password);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "User updated successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            userpicture: user.userpicture,
            fullname: user.fullname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error(`User ID:${req.params.id} not found`);
    }

    res.status(200).json({
        message: `User deleted successfully`
    });
});

export {
    register,
    login,
    logout,
    admin,
    upload,
    userPhoto,
    editUser,
    deleteUser
};
