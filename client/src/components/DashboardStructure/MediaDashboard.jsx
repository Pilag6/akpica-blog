import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "@contexts/PostContext.jsx";
// import { UserContext } from "@contexts/UserContext.jsx";
import BACKEND_URL from "@utils/backendUrl.js";

// icons
import {
  MdGridView,
  MdOutlineViewList,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const MediaDashboard = () => {
  const { posts } = useContext(PostContext);
  // const { users } = useContext(UserContext);
  const [isGridView, setIsGridView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const gridView = () => {
    setIsGridView(true);
  };
  const listView = () => {
    setIsGridView(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-akpica-white min-h-[calc(100vh-80px)] flex flex-col pt-6 pb-3 pl-8">
        <div className="flex items-center mb-4 border border-red-700">
          <h1 className="text-xl font-extrabold border border-red-700">
            Media Library
          </h1>
          <div className="flex items-center pt-6 pb-3 pl-8 gap-4">
            <button className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-black outline-none outline-akpica-black transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2">
              <FaPlus /> Add New Post
            </button>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="flex gap-2 text-2xl border border-akpica-black mb-3 mr-8 p-2">
          <button onClick={gridView}>
            <MdGridView />
          </button>
          <button onClick={listView}>
            <MdOutlineViewList />
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-1 text-base border border-akpica-black p-1"
              onClick={toggleDropdown}
            >
              All dates <MdOutlineKeyboardArrowDown />
            </button>
        {/* toggle dropdown */}
        {isOpen && (
          <div className="absolute bg-akpica-white border border-akpica-black p-2 text-base">
            <ul>
              <li className="p-2 hover:bg-akpica-pastel">All dates</li>
              <li className="p-2 hover:bg-akpica-pastel">Today</li>
              <li className="p-2 hover:bg-akpica-pastel">Yesterday</li>
              <li className="p-2 hover:bg-akpica-pastel">This week</li>
              <li className="p-2 hover:bg-akpica-pastel">This month</li>
              <li className="p-2 hover:bg-akpica-pastel">This year</li>
            </ul>
          </div>
        )}
        </div>
        </div>

        {/* views */}
        <div className="grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 pr-8">
          {isGridView ? (
            // Grid view
            posts &&
            posts.map((post) => (
              <img
                key={post._id}
                src={`${BACKEND_URL}/posts/photo/${
                  post.title
                }?${new Date().getTime()}`}
                alt="post image"
                className="object-cover mb-8 h-full"
              />
            ))
          ) : (
            // List view
            <table className="w-[1645px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    File
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Post Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th colSpan={2} className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {posts &&
                  posts.map((post, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6">
                        <img
                          src={`${BACKEND_URL}/posts/photo/${
                            post.title
                          }?${new Date().getTime()}`}
                          alt="post image"
                          className="aspect-square w-32 object-cover m-2"
                        />
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-akpica-white"
                      >
                        <Link to={`${post._id}`}>{post.title}</Link>
                      </td>
                      <td className="px-6 py-4">@{post.author.username}</td>
                      <td className="px-6 py-4 flex gap-3">
                        {post.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(post.date).toDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-akpica-marco dark:text-akpica-marco hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-akpica-tomato dark:text-akpica-tomato hover:underline"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaDashboard;
