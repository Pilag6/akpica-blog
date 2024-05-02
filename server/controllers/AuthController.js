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
    }
});

const upload = multer({ storage: storage });

/*
@desc    Register a new user
@route   POST /register
@access  Public
*/
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

/*
@desc    Login a user
@route   POST /login
@access  Public
*/
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
        // res.cookie("token", accessToken, {
        //     httpOnly: true,
        //     secure: true
        // });
        res.cookie("token", accessToken);

    

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

/*
@desc    Logout a user
@route   POST /logout
@access  Public
 */
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    console.log(res.cookie("token", ""));

    // Send the response
    res.status(200).json({
        message: "User logged out successfully"
    });
});

/*
@desc    Admin page - Get all users
@route   GET /admin
@access  Private
*/
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
                userpicture: user.userpicture,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        })
    });
});

/* 
@desc Admin page - Get individual users
@route GET /admin/:id
@access Private
*/

const getOneUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "User found",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            userpicture: user.userpicture,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
});

/*
@desc    Get user photo
@route   GET /photo/:username
@access  Public
*/
const userPhoto = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    const picturePath = "uploads/" + user.userpicture;
    const absolutePath = path.join(__dirname, "../", picturePath);
    // console.log(absolutePath);
    res.sendFile(absolutePath);
});

/*
@desc    Edit user Picture
@route   PATCH /admin/editPicture/:id
@access  Private
*/
const editUserPicture = asyncHandler(async (req, res) => {
    const { userpicture } = req.body;

    // console.log(req.file);
    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            userpicture: req.file.filename
        },
        {
            new: true
        }
    );

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

/* 
@desc Edit User Info
@route PATCH /admin/editUserInfo/:id
@access Private 
*/

const editUserInfo = asyncHandler(async (req, res) => {
    const { email, fullname, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            email,
            fullname,
            password: hashedPassword
        },
        {
            new: true
        }
    );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    console.log(user);

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
    }
});

/*
@desc    Delete user
@route   DELETE /admin/delete/:id
@access  Private
*/
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
    getOneUser,
    editUserPicture,
    editUserInfo,
    deleteUser
};
