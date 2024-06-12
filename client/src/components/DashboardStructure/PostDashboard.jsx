import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

// Post Context
import { PostContext } from "@contexts/PostContext.jsx";

// Icons
import { FaPlus } from "react-icons/fa";
import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const PostDashboard = () => {
    const { posts, postQuantity, setPosts } = useContext(PostContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [sortCriteria, setSortCriteria] = useState({
        field: "date",
        order: "desc"
    });
    const [expandedRows, setExpandedRows] = useState({});

    const queryParams = new URLSearchParams(location.search);
    const authorId = queryParams.get("authorId");

    const filteredPosts = authorId
        ? posts.filter((post) => post.author._id === authorId)
        : posts;

    const sortPosts = (posts) => {
        return posts.sort((a, b) => {
            if (sortCriteria.field === "date") {
                return sortCriteria.order === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            } else if (sortCriteria.field === "title") {
                return sortCriteria.order === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            } else if (sortCriteria.field === "author") {
                return sortCriteria.order === "asc"
                    ? a.author.username.localeCompare(b.author.username)
                    : b.author.username.localeCompare(a.author.username);
            }
            return 0;
        });
    };

    const sortedPosts = sortPosts(filteredPosts);

    const currentAuthor = authorId
        ? posts.find((post) => post.author._id === authorId)?.author.username
        : null;

    const handleShowAllPosts = () => {
        queryParams.delete("authorId");
        navigate({ search: queryParams.toString() });
    };

    const handleFilterByAuthor = (authorId) => {
        queryParams.set("authorId", authorId);
        navigate({ search: queryParams.toString() });
    };

    const handleSortChange = (field) => {
        setSortCriteria((prevCriteria) => ({
            field,
            order: prevCriteria.order === "asc" ? "desc" : "asc"
        }));
    };

    const confirmDeletePost = (postId) => {
        setPostToDelete(postId);
        setShowModal(true);
    };

    const deletePost = async () => {
        try {
            await Axios.delete(`${BACKEND_URL}/posts/${postToDelete}`, {
                withCredentials: true
            });
            setPosts(posts.filter((post) => post._id !== postToDelete));
            setShowModal(false);
            setPostToDelete(null);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleRow = (index) => {
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [index]: !prevExpandedRows[index]
        }));
    };

    return (
      <div>
        <div className="flex items-center pt-6 pb-3 pl-8">
          <button
            onClick={() => navigate("create")}
            className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
          >
            <FaPlus /> Add New Post
          </button>
        </div>
        <div className="flex m-2 items-center gap-4 pl-8">
          <div
            className="text-akpica-white cursor-pointer underline underline-offset-4"
            onClick={handleShowAllPosts}
          >
            All Posts ({postQuantity})
          </div>
          {currentAuthor && (
            <div className="pl-4 text-akpica-white">
              {currentAuthor} ({sortedPosts.length})
            </div>
          )}
        </div>

        <section className="flex flex-col md:flex-row justify-center gap-6 w-full p-4">
          <div className="relative overflow-x-auto shadow-md w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSortChange("title")}
                  >
                    Post Title
                    <MdOutlineChevronRight
                      className={`ml-1 inline-block transform ${
                        sortCriteria.field === "title" &&
                        sortCriteria.order === "asc"
                          ? "rotate-90"
                          : "-rotate-90"
                      }`}
                    />
                  </th>
                  <th
                    className="hidden md:table-cell px-6 py-3 cursor-pointer"
                    onClick={() => handleSortChange("author")}
                  >
                    Author
                    <MdOutlineChevronRight
                      className={`ml-1 inline-block transform ${
                        sortCriteria.field === "author" &&
                        sortCriteria.order === "asc"
                          ? "rotate-90"
                          : "-rotate-90"
                      }`}
                    />
                  </th>
                  <th className="hidden md:table-cell py-3">Tags</th>
                  <th
                    className="hidden md:table-cell py-3 cursor-pointer"
                    onClick={() => handleSortChange("date")}
                  >
                    Date
                    <MdOutlineChevronRight
                      className={`ml-1 inline-block transform ${
                        sortCriteria.field === "date" &&
                        sortCriteria.order === "asc"
                          ? "rotate-90"
                          : "-rotate-90"
                      }`}
                    />
                  </th>
                  <th className="hidden md:table-cell px-6 py-3" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedPosts.map((post, index) => (
                  <>
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                    >
                      <td className="flex items-center pl-4 py-4 w-20 h-20 ">
                        <img
                          src={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                            post.title
                          )}`}
                          alt="post image"
                          className="w-full h-full object-cover"
                        />
                      </td>
                      <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-akpica-white">
                        <div className="flex items-center justify-between">
                          <Link to={`/${post.slug}`}>
                            {/* Mobile title - truncated */}
                            <span className="inline-block sm:hidden">
                              {post.title.length > 32
                                ? `${post.title.substring(0, 32)}...`
                                : post.title}
                            </span>

                            {/* Desktop title - full */}
                            <span className="hidden sm:block">
                              {post.title}
                            </span>
                          </Link>

                          <button
                            onClick={() => toggleRow(index)}
                            className="md:hidden text-2xl text-akpica-marco dark:text-akpica-marco hover:text-akpica-whitedark:hover:text-akpica-white focus:outline-none transition-all"
                          >
                            {expandedRows[index] ? (
                              <MdOutlineExpandMore />
                            ) : (
                              <MdOutlineChevronRight />
                            )}
                          </button>
                        </div>
                      </td>

                      <td
                        className="hidden md:table-cell px-6 py-4 cursor-pointer"
                        onClick={() => handleFilterByAuthor(post.author._id)}
                      >
                        @{post.author.username}
                      </td>
                      <td className="hidden md:table-cell py-4">
                        {post.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded text-xs mr-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td className="hidden md:table-cell py-4">
                        {new Date(post.date).toDateString()}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4">
                        <button
                          onClick={() => navigate(`edit/${post._id}`)}
                          className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4">
                        <button
                          onClick={() => confirmDeletePost(post._id)}
                          className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {expandedRows[index] && (
                      <tr className="md:hidden bg-gray-800 border-b border-gray-700 ">
                        <td colSpan={6} className="px-6 py-2">
                          <div className="flex items-center justify-between gap-4 py-2">
                            <div>AUTHOR: @{post.author.username}</div>
                          </div>
                          <div className="py-2">
                            TAGS:{" "}
                            {post.tags.slice(0, 4).map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-200  dark:bg-gray-700 dark:text-gray-400 px-2 py-1 mr-2 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="py-2 flex items-center justify-between">
                            <div>
                              DATE: {new Date(post.date).toDateString()}
                            </div>
                            <div>
                              <button
                                onClick={() => navigate(`edit/${post._id}`)}
                                className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => confirmDeletePost(post._id)}
                                className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline ml-4"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this post?</p>
              <p className="text-xs mt-2 text-red-600">
                This action is irreversible.
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={deletePost}
                  className="px-4 py-2 bg-akpica-tomato text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default PostDashboard;
