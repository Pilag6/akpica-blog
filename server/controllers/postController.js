import asyncHandler from "../config/asyncHandler.js";
import PostModel from "../models/PostModel.js";
import  cloudinary  from "../utils/cloudinary.js";

import path from "path";
import { fileURLToPath } from "url";

// Define the __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

/* 
@desc    Create a new post
@route   POST /posts
@access  Public
*/
const createPost = asyncHandler(async (req, res) => {
    console.log("try", req.file);
    const { title, content, image, date, tags } = req.body;

    if (!title || !content ) {
        res.status(400);
        throw new Error("Title and Content are required");
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
	let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
	// const cloudinaryRes = await cloudinary.uploader.upload(dataURI)

    const result = await cloudinary.uploader.upload(dataURI, {
        folder: "akpica-blog",
        width: 300,
        height: 300,
        crop: "fill"
    });
    console.log("result...", result);
    const post = await PostModel.create({
        title,
        content,
        date,
        author: req.user.id,
        image: result.public_id,
        tags: tags.split(",")
    });
    res.status(201).json(post);
});

/*
@desc    Get post photo
@route   GET /photo/:username
@access  Public
*/
const postPhoto = asyncHandler(async (req, res) => {
    const { title } = req.params;
    const post = await PostModel.findOne({ title });
    const picturePath = "uploads/" + post.image;
    const absolutePath = path.join(__dirname, "../", picturePath);
    // console.log(absolutePath);
    res.sendFile(absolutePath);
});

/* 
@desc    Get all posts
@route   GET /posts
@access  Public
*/
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostModel.find().populate("author");
    // Handling error in case that there aren't posts in our DB
    if (!posts || posts.length === 0) {
        res.status(404);
        throw new Error("No posts found in our DB.");
    }
    res.status(200).json(posts);
});

/* 
@desc    Get an post by ID
@route   GET /posts/:id
@access  Public
*/
const getPostById = asyncHandler(async (req, res) => {
    const post = await PostModel.findById(req.params.id).populate("author");
    // Handling error in case that there isn't a post with the provided ID
    if (!post) {
        res.status(404);
        throw new Error(`Post ID:${req.params.id} not found.`);
    }
    res.status(200).json(post);
});

/*
@desc    Get posts by tags
@route   GET /posts/tags/:tags
@access  Public
*/

const getPostsByTags = asyncHandler(async (req, res) => {
    const { tags } = req.params;
    const posts = await PostModel.find({ tags: tags }).populate("author");
    // Handling error in case that there aren't posts in our DB
    if (!posts || posts.length === 0) {
        res.status(404);
        throw new Error("No posts found in our DB.");
    }
    res.status(200).json(posts);
});

/* 
@desc    Update an post
@route   PATCH /posts/:id
@access  Public
*/
const updateOnePost = asyncHandler(async (req, res) => {
    const postUpdated = await PostModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }

        // What is {new: true}?
        // By default, findByIdAndUpdate() returns the original document.
        // To return the document after update you have to pass an option: new: true.
    );

    // Handling error in case that there isn't a post with the provided ID
    if (!postUpdated) {
        res.status(404);
        throw new Error(`Post ID:${req.params.id} not found.`);
    }
    res.status(200).json(postUpdated);
});

/* 
@desc    Delete an post
@route   DELETE /posts/:id
@access  Public
*/
const deleteOnePost = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const postDeleted = await PostModel.findByIdAndDelete(req.params.id);
    // Handling error in case that there isn't a post with the provided ID
    if (!postDeleted) {
        res.status(404);
        throw new Error(`Post ID:${req.params.id} not found.`);
    }
    res.status(200).json({ message: "Post is deleted.", title: title });
});

export {
    createPost,
    postPhoto,
    getAllPosts,
    getPostById,
    updateOnePost,
    deleteOnePost,
    getPostsByTags
};
