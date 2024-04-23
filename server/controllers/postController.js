import asyncHandler from "../config/asyncHandler.js";
import PostModel from "../models/PostModel.js";

/* 
@desc    Create a new post
@route   POST /posts
@access  Public
*/
const create = asyncHandler(async (req, res) => {
    const post = await PostModel.create(req.body);
    res.status(201).json(post);
});

/* 
@desc    Get all posts
@route   GET /posts
@access  Public
*/
const getAll = asyncHandler(async (req, res) => {
    const posts = await PostModel.find();
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
const getById = asyncHandler(async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    // Handling error in case that there isn't a post with the provided ID
    if (!post) {
        res.status(404);
        throw new Error(`Post ID:${req.params.id} not found.`);
    }
    res.status(200).json(post);
});

/* 
@desc    Update an post
@route   PATCH /posts/:id
@access  Public
*/
const update = asyncHandler(async (req, res) => {
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
const deleteOne = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const postDeleted = await PostModel.findByIdAndDelete(req.params.id);
    // Handling error in case that there isn't a post with the provided ID
    if (!postDeleted) {
        res.status(404);
        throw new Error(`Post ID:${req.params.id} not found.`);
    }
    res.status(200).json({ message: "Post is deleted.", title: title });
});

export { create, getAll, getById, update, deleteOne };
