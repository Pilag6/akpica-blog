import UserModel from "../models/UserModel.js";
import asyncHandler from "../config/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import path from "path";
import { fileURLToPath } from "url";

// Define the __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

/*
@desc    Register a new user
@route   POST /register
@access  Public
*/
const register = asyncHandler(async (req, res) => {
    // Destructure the request body
    const { username, email, password, fullname, role } = req.body;
    // console.log(req);

    // if(role !== "admin") {
    //     res.status(403);
    //     throw new Error("Invalid role");
    // }

    // Hash de password before saving in database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await UserModel.create({
        username,
        role,
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
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
        const accessToken = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                userpicture: user.userpicture,
                fullname: user.fullname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

/*
@desc    Logout a user
@route   POST /logout
@access  Public
 */
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    // console.log(res.cookie("token", ""));

    // Send the response
    res.status(200).json({
        message: "User logged out successfully"
    });
});

/* 
@desc    Get logged-in user's data
@route   GET /admin/me
@access  Private
*/ 
const getMe = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            userpicture: user.userpicture,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
});

/*
@desc    Admin page - Get all users
@route   GET /admin
@access  Private
*/
const admin = asyncHandler(async (req, res) => {
    const user = await UserModel.find();

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
                role: user.role,
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
            role: user.role,
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
    // const { userpicture } = req.body;

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
    const { email, fullname, password, role } = req.body;

    // console.log("BODY", req.body);

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
    }

    const userUpdate = { email, fullname, role };
    if (hashedPassword) {
        userUpdate.password = hashedPassword;
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, userUpdate, {
        new: true
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (password) {
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
    }

    // Create a token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    // Create a cookie and set the token
    res.cookie("token", accessToken);

    // Send the token to the client
    res.status(200).json({
        message: "User updated successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            userpicture: user.userpicture,
            fullname: user.fullname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
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

/*
@desc    Verify the current token
@route   GET /auth/token
@access  Private
*/
const verifyToken = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

export {
    register,
    login,
    logout,
    admin,
    userPhoto,
    getOneUser,
    editUserPicture,
    editUserInfo,
    deleteUser,
    getMe,
    verifyToken
};
