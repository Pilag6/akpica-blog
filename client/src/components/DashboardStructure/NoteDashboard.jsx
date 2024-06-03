import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import BACKEND_URL from "@utils/backendUrl.js";

// icons
import { GrNotes } from "react-icons/gr";
import { TiDelete, TiEdit } from "react-icons/ti";
import { GoPlus } from "react-icons/go";

const NoteDashboard = () => {
    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [displayNotes, setDisplayNotes] = useState([]);
    const [error, setError] = useState(null);
    // const [username, setUsername] = useState(null);
    // delete note
    const [showModal, setShowModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    // edit note
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await Axios.get(`${BACKEND_URL}/notes`, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setDisplayNotes(response.data);
                    console.log("display:", displayNotes);
                }
            } catch (error) {
                setError(
                    error.response
                        ? error.response.data.errors
                        : "An error occurred while fetching notes"
                );
            }
        };
        fetchNotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = { title, content };
        try {
            const response = await Axios.post(`${BACKEND_URL}/notes`, note, {
                withCredentials: true
            });
            if (response.status === 201) {
                setDisplayNotes([...displayNotes, response.data]);
                setContent("");
                setTitle("");
                navigate("/dh-admin/dashboard/usersDashboard");
            }
            //   const res = await Axios.get(`${BACKEND_URL}/me`, {
            //     withCredentials: true,
            // });
            // const user = res.data.user;
            // setUsername(user.username);
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    // delete note
    const confirmDeleteNote = (noteId) => {
        setNoteToDelete(noteId);
        setShowModal(true);
    };

    const deleteNote = async () => {
        try {
            await Axios.delete(`${BACKEND_URL}/notes/${noteToDelete}`, {
                withCredentials: true
            });
            setDisplayNotes(
                displayNotes.filter((note) => note._id !== noteToDelete)
            );
            setShowModal(false);
            setNoteToDelete(null);
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    // edit note
    const confirmEditNote = (noteId) => {
        const note = displayNotes.find((note) => note._id === noteId);
        setEditTitle(note.title);
        setEditContent(note.content);
        setNoteToEdit(noteId);
        setShowEditModal(true);
    };

    const editNote = async (e) => {
        e.preventDefault();
        const updatedNote = { title: editTitle, content: editContent };
        try {
            const response = await Axios.patch(
                `${BACKEND_URL}/notes/${noteToEdit}`,
                updatedNote,
                {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                setDisplayNotes(
                    displayNotes.map((note) =>
                        note._id === noteToEdit
                            ? {
                                  ...note,
                                  title: editTitle,
                                  content: editContent
                              }
                            : note
                    )
                );
                setEditTitle("");
                setEditContent("");
                setShowEditModal(false);
                setNoteToEdit(null);
            }
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    return (
        <>
            <div className="flex items-center gap-2 text-akpica-white bg-gray-700 py-2 px-6">
                <span className="text-md text-gray-400">
                    <GrNotes />
                </span>
                <h1 className="font-semibold text-gray-400 uppercase">Notes</h1>
            </div>
            <p className="text-lg my-6 text-gray-400 px-6 uppercase font-semibold">
                A place for random notes
            </p>

            <div className="mb-4 border-b border-gray-700 pb-8 px-6">
                <form onSubmit={handleSubmit} className="flex gap-4 h-32">
                    <div className="flex flex-col gap-4 w-2/4 h-full text-akpica-white">
                        <input
                            type="text"
                            className="border border-gray-700 bg-gray-800 p-2 hover:bg-gray-700"
                            id="title"
                            name="title"
                            placeholder="Note title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <textarea
                            name="note"
                            id="note"
                            placeholder="Enter a note here . . ."
                            className="border border-gray-700 bg-gray-800 p-2 resize-none hover:bg-gray-700"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        ></textarea>
                    </div>
                    <button
                        title="Add Note"
                        type="submit"
                        className="p-2 text-4xl flex items-center justify-center border border-gray-700 hover:bg-gray-600 active:bg-gray-500 text-akpica-white w-32 h-full"
                    >
                        <GoPlus />
                    </button>
                </form>
            </div>
            {/* each note */}
            <div className="my-4 w-full h-[405px] flex flex-row flex-wrap gap-4 overflow-y-auto px-6">
                {displayNotes &&
                    displayNotes.map((note) => (
                        <div
                            key={note._id}
                            // p-2 mb-2 w-40 h-40 border border-gray-700  flex flex-col text-akpica-white
                            className="mb-2 w-80 h-60 border border-gray-700 flex flex-col text-akpica-white hover:bg-gray-700 group"
                        >
                            <div className="px-2 py-4 font-bold border-b border-gray-700 group-hover:border-gray-800 flex items-center justify-between h-20">
                                <h2 className="pl-1 text-gray-400">{note.title}</h2>
                                <button
                                    onClick={() => confirmDeleteNote(note._id)}
                                    title="Delete"
                                    className="text-akpica-tomato text-2xl hover:text-red-400 active:text-red-800"
                                >
                                    <TiDelete />
                                </button>
                            </div>

                            <div className="flex flex-col justify-between h-full w-full overflow-y-auto">
                                <p className="p-3 text-gray-400">
                                    {note.content}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-auto border-t border-gray-700 group-hover:border-gray-800">
                                <p className="text-gray-500 p-2">
                                    By: @{note.author.username}
                                </p>
                                <button
                                    title="Edit"
                                    onClick={() => confirmEditNote(note._id)}
                                    className="text-akpica-white/60 text-xl p-2 hover:text-akpica-white"
                                >
                                    <TiEdit />
                                </button>
                            </div>

                        </div>
                    ))}
            </div>

            {/* to delete */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 shadow-lg text-akpica-black">
                        <h2 className="text-lg font-semibold mb-4">
                            Confirm Deletion
                        </h2>
                        <p>Are you sure you want to delete this note?</p>
                        <p className="text-xs mt-2 text-red-600">
                            This action is irreversible.
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={deleteNote}
                                className="px-4 py-2 bg-akpica-tomato text-white hover:bg-red-600"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 h-80 w-80 p-6 border border-gray-700">
                        <form className="flex flex-col gap-4 text-akpica-black">
                            <input
                                type="text"
                                className="border border-gray-700 p-2 text-akpica-white bg-gray-800"
                                id="editTitle"
                                name="editTitle"
                                placeholder="Title"
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle}
                            />
                            <textarea
                                name="editNote"
                                id="editNote"
                                placeholder="Enter a note here . . ."
                                className="border border-gray-700 p-2 text-akpica-white bg-gray-800 resize-none h-32"
                                onChange={(e) => setEditContent(e.target.value)}
                                value={editContent}
                            ></textarea>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={editNote}
                                    type="button" // Change this to button type="button" to prevent form submission
                                    className="bg-akpica-green hover:bg-akpica-carlo text-white px-4 py-2"
                                >
                                    Edit Note
                                </button>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteDashboard;
