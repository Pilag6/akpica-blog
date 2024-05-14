import { Router } from "express";

import {
    createPost,
    getAllPosts,
    getPostById,
    updateOnePost,
    deleteOnePost
} from "../controllers/postController.js";

import { isAuth } from "../middlewares/isAuth.js";

const postRouter = Router();

// CRUD -----------

// CREATE
postRouter.post("/", isAuth, createPost);
// READ all
postRouter.get("/", getAllPosts);
// READ each
postRouter.get("/:id", getPostById);
// UPDATE
postRouter.patch("/:id", isAuth, updateOnePost);
// DELETE one
postRouter.delete("/:id", isAuth, deleteOnePost);

export default postRouter;
