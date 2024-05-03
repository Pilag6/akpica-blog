import { Router } from "express";

import {
    createPost,
    getAllPosts,
    getPostById,
    updateOnePost,
    deleteOnePost,
} from "../controllers/postController.js";

const postRouter = Router();

// CRUD -----------

// CREATE 
postRouter.post("/", createPost);
// READ all 
postRouter.get("/", getAllPosts);
// READ each 
postRouter.get("/:id", getPostById);
// UPDATE 
postRouter.patch("/:id", updateOnePost);
// DELETE one
postRouter.delete("/:id", deleteOnePost)



export default postRouter;