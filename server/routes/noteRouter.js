import { Router } from "express";
import { createNote, deleteOneNote, getAllNotes, updateOneNote } from "../controllers/noteController.js";
import { isAuth } from "../middlewares/isAuth.js";

const noteRouter = Router();

// CRUD -----------
// create a note
noteRouter.post("/", isAuth, createNote);
// read all notes
noteRouter.get("/", isAuth, getAllNotes);
// update a note
noteRouter.patch("/:id", isAuth, updateOneNote);
// delete a note
noteRouter.delete("/:id", isAuth, deleteOneNote);

export default noteRouter;