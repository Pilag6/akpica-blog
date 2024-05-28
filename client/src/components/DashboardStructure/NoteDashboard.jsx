import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { GrNotes } from "react-icons/gr";
import { TiDelete, TiEdit } from "react-icons/ti";
import BACKEND_URL from "@utils/backendUrl.js";

const NoteDashboard = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [displayNotes, setDisplayNotes] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
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
          withCredentials: true,
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
        withCredentials: true,
      });
      if (response.status === 201) {
        setDisplayNotes([...displayNotes, response.data]); // Add the response data
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
        withCredentials: true,
      });
      setDisplayNotes(displayNotes.filter((note) => note._id !== noteToDelete));
      setShowModal(false);
      setNoteToDelete(null);
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  // edit note
  const confirmEditNote = (noteId) => {
    const note = displayNotes.find((note) => note._id === noteId);
    setEditTitle(note.title); // use setEditTitle here
    setEditContent(note.content); // use setEditContent here
    setNoteToEdit(noteId);
    setShowEditModal(true);
  };

  const editNote = async (e) => {
    e.preventDefault();
    const updatedNote = { title: editTitle, content: editContent }; // use editTitle and editContent here
    try {
      const response = await Axios.patch(
        `${BACKEND_URL}/notes/${noteToEdit}`,
        updatedNote,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setDisplayNotes(
          displayNotes.map((note) =>
            note._id === noteToEdit ? { ...note, title: editTitle, content: editContent } : note
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
      <div className="flex items-baseline gap-2">
        <span className="text-xl">
          <GrNotes />
        </span>
        <h1 className="font-bold text-3xl">Notes</h1>
      </div>

      <p className="text-lg mb-4">A place for random notes</p>

      <div className="w-2/4 text-left text-akpica-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="bg-akpica-white border border-akpica-black pl-1"
            id="title"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="note"
            id="note"
            placeholder="Enter a note here . . ."
            className="bg-akpica-white border border-akpica-black pl-1"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <button
            type="submit"
            className="border border-akpica-black bg-akpica-marco p-2 w-20 hover:bg-yellow-600 active:bg-akpica-pastel/50"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="my-4 w-full h-96 flex flex-row flex-wrap gap-4 overflow-y-scroll ml-4">
        {displayNotes &&
          displayNotes.map((note) => (
            <div
              key={note._id}
              className="p-2 mb-2 w-40 h-40 shadow-2xl flex flex-col bg-akpica-white text-akpica-black"
            >
              <div className="font-bold border border-b-akpica-black pb-1 mb-1 flex flex-row items-center justify-between">
                <h2>{note.title}</h2>
                <button
                  onClick={() => confirmDeleteNote(note._id)}
                  className="text-akpica-tomato text-xl hover:text-red-600"
                >
                  <TiDelete />
                </button>
              </div>

              <div className="flex flex-col justify-between h-28">
                <p className="overflow-y-scroll overflow-x-hidden">
                  {note.content}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <p>@{note.author.username}</p>
                  <button
                    onClick={() => confirmEditNote(note._id)}
                    className="text-akpica-green text-xl hover:text-green-600"
                  >
                    <TiEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* to delete */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg text-akpica-black">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this note?</p>
            <p className="text-xs mt-2 text-red-600">
              This action is irreversible.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={deleteNote}
                className="bg-akpica-tomato text-white hover:bg-red-600 p-2"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-black bg-gray-300 hover:bg-gray-400 p-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg">
            <form className="flex flex-col gap-4 text-akpica-black">
              <input
                type="text"
                className="bg-akpica-white border border-akpica-black pl-1"
                id="editTitle" // Change the id to be unique
                name="editTitle" // Change the name to be unique
                placeholder="Title"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle}
              />

              <textarea
                name="editNote" // Change the name to be unique
                id="editNote" // Change the id to be unique
                placeholder="Enter a note here . . ."
                className="bg-akpica-white border border-akpica-black pl-1"
                onChange={(e) => setEditContent(e.target.value)}
                value={editContent}
              ></textarea>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={editNote}
                  type="button" // Change this to button type="button" to prevent form submission
                  className="bg-akpica-carlo/80 hover:bg-akpica-green text-white p-2"
                >
                  Edit Note
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-akpica-marco hover:bg-yellow-600 text-white p-2"
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
