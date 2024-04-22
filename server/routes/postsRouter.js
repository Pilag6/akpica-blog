import { Router } from "express";

import {
    create,
    getAll,
    getById,
    update,
    deleteOne,
} from "../controllers/postController.js";

const postRouter = Router();

// CRUD -----------

// CREATE 
postRouter.post("/", create);
// READ all 
postRouter.get("/", getAll);
// READ each 
postRouter.get("/:id", getById);
// UPDATE 
postRouter.patch("/:id", update);
// DELETE one
postRouter.delete("/:id", deleteOne)



export default postRouter;