import asyncHandler from "../config/asyncHandler.js";
import NoteModel from "../models/NoteModel.js";

/*
@desc    Create a new note
@route   POST /note
@access  Private
*/
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await NoteModel.create({
    title,
    content,
    author: req.user.id,
    // author,
  });
  res.status(201).json(note);
});

/*
@desc    Get all notes
@route   GET /note
@access  Private
*/
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find().populate("author");
  // Handling error in case that there aren't notes in our DB
  if (!notes || notes.length === 0) {
    res.status(404);
    throw new Error("No notes found in our DB.");
  }
  res.status(200).json(notes);
});

/*
@desc    Update a note
@route   PATCH /note/:id
@access  Private
*/
const updateOneNote = asyncHandler(async (req, res) => {
const noteUpdate = await NoteModel.findByIdAndUpdate(req.params.id,
    req.body,
    { new: true }
);
if (!noteUpdate) {
  res.status(404);
  throw new Error(`Note ID:${req.params.id} not found.`);
}
res.status(200).json(noteUpdate);
});

/* 
@desc    Delete a note
@route   DELETE /note/:id
@access  Private
*/
const deleteOneNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const noteDeleted = await NoteModel.findByIdAndDelete(id);
  if (!noteDeleted) {
    res.status(404);
    throw new Error(`Note ID:${id} not found.`);
  }
  res.status(200).json({ message: "Note deleted" });
})




export { createNote, getAllNotes, updateOneNote, deleteOneNote };
