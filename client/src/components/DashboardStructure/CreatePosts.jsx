import { useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import BACKEND_URL from "@utils/backendUrl";
import logoBlack from "@assets/logo-black-h.png";

const CreatePosts = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([""]);
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const defaultImageUrl = logoBlack; // URL to the default image

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", tags);
        formData.append("date", date);

        if (image) {
            formData.append("image", image);
        } else {
            const response = await fetch(defaultImageUrl);
            const blob = await response.blob();
            formData.append("image", blob, "default-image.jpg");
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/posts`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                setMessage("Post created successfully.");
                setTitle("");
                setContent("");
                setTags("");
                setDate("");
                setImage(null);
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.errors || "Something went wrong.");
        }
    };

    return (
        <div className="bg-white min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Create a New Post
            </h2>
            <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border w-full py-2 px-3 text-akpica-black bg-akpica-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <Editor
                        id="content"
                        apiKey="ujpjljf2w68tcn5tj97ptrpt24akyj725vw7apcx0a9bg54f"
                        value={content}
                        init={{
                            selector: "textarea",
                            height: 400,
                            menubar: true,
                            plugins:
                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes autocorrect typography inlinecss markdown",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight checklist numlist bullist indent outdent | emoticons charmap | addcomment showcomments | spellcheckdialog a11ycheck typography | removeformat | anchor | code preview | fullscreen | help | wordcount | insertdatetime"
                        }}
                        onEditorChange={(newContent) => setContent(newContent)}
                        initialValue="Welcome to Akpica Blog!"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tags"
                    >
                        Tags (comma separated)
                    </label>
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="shadow appearance-none border  w-full py-2 px-3 text-akpica-black bg-akpica-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="date"
                    >
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="shadow appearance-none border w-full py-2 px-3 text-akpica-black bg-akpica-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                    >
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="shadow appearance-none border  w-fit py-2 px-3 text-akpica-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-akpica-carlo hover:bg-akpica-green text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                >
                    Create Post
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default CreatePosts;
