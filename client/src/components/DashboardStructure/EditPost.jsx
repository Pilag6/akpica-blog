import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import BACKEND_URL from "@utils/backendUrl";

import { PiPlusSquareBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [authorId, setAuthorId] = useState("");

    const dateInputRef = useRef(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/posts/${id}`);
                if (response.status === 200) {
                    const post = response.data;
                    setTitle(post.title);
                    setContent(post.content);
                    setTags(post.tags);
                    setDate(post.date.split('T')[0]);
                    setAuthorId(post.author.fullname || post.author); // Store author ID
                    setImage(post.image); // Assuming post.image is a URL
                } else {
                    setError("Failed to load post data.");
                }
            } catch (error) {
                console.error("Failed to fetch post data:", error);
                setError("Failed to load post data.");
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/me`, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    const user = response.data.user;
                    setAuthorId(user._id); // Store user ID
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchPostData();
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postDate = date || new Date().toISOString().split("T")[0];
        const postTags = tags.length > 0 ? tags : ["akpica"];

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", postTags.join(","));
        formData.append("date", postDate);

        if (image && typeof image !== "string") {
            formData.append("image", image);
        }

        try {
            const response = await axios.patch(
                `${BACKEND_URL}/posts/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setMessage("Post updated successfully.");
                removeNotification(4000);
            } else {
                setError("Failed to update post.");
            }
        } catch (error) {
            console.error("Error updating post:", error);
            setError(error.response?.data?.message || "Something went wrong.");
            removeNotification(6000);
        }

        console.log("FormData before PATCH:", {
            title,
            content,
            tags: postTags.join(","),
            date: postDate,
            image
        });
    };

    const handleIconClick = () => {
        dateInputRef.current.showPicker();
    };

    const handleTagChange = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = e.target.value.trim().replace(/,$/, "");
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            e.target.value = "";
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const removeNotification = (time) => {
        setTimeout(() => {
            setMessage("");
            setError("");
        }, time);
    };

    return (
        <div className="bg-white min-h-screen py-6 px-10">
            <h2 className="font-akpica-heading w-fit flex items-center gap-3 py-2 px-4 text-3xl font-semibold text-akpica-carlo border-2 border-akpica-carlo mb-5">
                Edit Post
            </h2>
            <form
                onSubmit={handleSubmit}
                className="w-full flex justify-center gap-5"
            >
                <section className="flex-1">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2 font-akpica-heading text-xl"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="appearance-none border w-full py-2 px-3 text-akpica-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-akpica-heading text-xl font-bold mb-2"
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
                                    "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table code preview | align lineheight checklist numlist bullist indent outdent | emoticons charmap | addcomment showcomments | spellcheckdialog a11ycheck typography | removeformat | anchor |  fullscreen | help | wordcount | insertdatetime"
                            }}
                            onEditorChange={(newContent) =>
                                setContent(newContent)
                            }
                        />
                    </div>
                </section>

                <aside className="flex flex-col">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-akpica-heading text-xl font-bold mb-2"
                            htmlFor="tags"
                        >
                            Tags (press Enter or comma to add)
                        </label>
                        <input
                            id="tags"
                            type="text"
                            onKeyDown={handleTagChange}
                            className="appearance-none border w-full py-2 px-3 text-akpica-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-akpica-carlo text-white px-3 py-1 rounded-full"
                                >
                                    {tag}
                                    <AiFillCloseCircle
                                        className="ml-2 cursor-pointer"
                                        onClick={() => handleTagRemove(tag)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label
                            className="block text-gray-700 font-akpica-heading text-xl font-bold mb-2"
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <div className="relative">
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onClick={handleIconClick}
                                className="appearance-none border w-full py-2 px-3 text-akpica-black bg-white leading-tight focus:outline-none focus:shadow-outline pr-10"
                                ref={dateInputRef}
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={handleIconClick}
                            >
                                <FaRegCalendarAlt className="text-akpica-carlo" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-akpica-heading text-xl font-bold mb-2"
                            htmlFor="image"
                        >
                            Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="appearance-none border  w-fit py-2 px-3 text-akpica-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-akpica-heading text-xl font-bold mb-2"
                            htmlFor="author"
                        >
                            Author
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={authorId}
                            readOnly
                            className="appearance-none border w-full py-2 px-3 text-akpica-black bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex justify-center items-center gap-3 uppercase font-akpica-heading text-2xl mt-auto mb-4 bg-akpica-carlo hover:bg-akpica-green text-white font-[600] p-4 w-full focus:outline-none focus:shadow-outline"
                    >
                        update post <PiPlusSquareBold />
                    </button>
                </aside>
            </form>
            {message && (
                <p className="mt-4 bg-akpica-green text-white w-fit p-3">
                    {message}
                </p>
            )}
            {error && (
                <p className="mt-4 text-white bg-akpica-tomato w-fit p-3">
                    {error}
                </p>
            )}
        </div>
    );
};

export default EditPost;
