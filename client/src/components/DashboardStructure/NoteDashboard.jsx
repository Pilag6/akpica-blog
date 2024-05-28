import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// icon
import { GrNotes } from "react-icons/gr";

//Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const NoteDashboard = () => {
  // UseNavigate
  const navigate = useNavigate();

  const [content, setContent] = useState(""); // notes
  const [title, setTitle] = useState("");
  const [displayNotes, setDisplayNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await Axios.get(`${BACKEND_URL}/notes`, { withCredentials: true });
        if (response.status === 200) {
          setDisplayNotes(response.data);
        }
      } catch (error) {
        setError(error.response ? error.response.data.errors : "An error occurred while fetching notes");
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, content };
    try {
      const response = await Axios.post(
        `${BACKEND_URL}/notes`,
        note,
        { withCredentials: true }
      );
      if (response.status === 201) {
        // to add new note to currentNotes
        setDisplayNotes([...displayNotes, note]);
        setContent("");
        setTitle("");
        navigate("/dh-admin/dashboard/usersDashboard");
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

      <p className="text-lg mb-4 text-center">A place for random notes</p>

      <div className="w-2/4 text-left">
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
          <input
            type="text"
            className="bg-akpica-white border border-akpica-black pl-1"
            id="note"
            name="note"
            placeholder="Enter a note here . . ."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button
            type="submit"
            className="border border-akpica-black p-2 w-20 hover:bg-akpica-pastel active:bg-akpica-pastel/50"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="my-2 w-full h-96 grid grid-cols-4 overflow-y-scroll">
        {/* {displayNotes && displayNotes.map((note, index) => (
            <div key={index} className="p-2 mb-2 w-40 h-40 border border-green-600">
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))
        )} */}

        {displayNotes && displayNotes.map((note, index) => (
          <div key={index} className="p-2 mb-2 w-40 h-40 shadow-2xl">
            <h2 className="font-bold border border-b-akpica-black pb-1 mb-1">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NoteDashboard;
