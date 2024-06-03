import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "@contexts/PostContext.jsx";
import BACKEND_URL from "@utils/backendUrl.js";

// icons
import {
  MdGridView,
  MdOutlineViewList,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import AuthorDate from "@components/miniComponents/AuthorDate.jsx";

const MediaDashboard = () => {
  const { posts } = useContext(PostContext);
  const [isGridView, setIsGridView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("All dates");

  const gridView = () => {
    setIsGridView(true);
  };
  const listView = () => {
    setIsGridView(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const buttonStyles =
    "font-bold hover:text-akpica-white focus:text-akpica-white active:text-akpica-tomato/70";


  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    setIsOpen(false);
  };

  const filterPostsByDate = (posts, range) => {
    const now = new Date();
    return posts.filter((post) => {
      const postDate = new Date(post.date);
      switch (range) {
        case "Today":
          return (
            postDate.getDate() === now.getDate() &&
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear()
          );
        case "Yesterday":
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          return (
            postDate.getDate() === yesterday.getDate() &&
            postDate.getMonth() === yesterday.getMonth() &&
            postDate.getFullYear() === yesterday.getFullYear()
          );
        case "This week":
          const startOfWeek = new Date(now);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          return postDate >= startOfWeek;
        case "This month":
          return (
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear()
          );
        case "This year":
          return postDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredPosts = filterPostsByDate(posts, selectedDateRange);


  return (
    <>
      <div className="bg-black min-h-[calc(100vh-80px)] flex flex-col pt-6 pb-3 pl-8 text-akpica-white">
        <div className="flex items-center mb-4">
          <div className="flex items-center pb-3 gap-4">
            <button className="w-fit flex items-center gap-3 p-2 text-xl font-semibold text-akpica-white outline-none outline-akpica-white transition-all hover:bg-akpica-marco hover:text-zinc-800 hover:outline-2 focus:bg-akpica-pastel/95 active:bg-akpica-pastel/80">
              <FaPlus /> Add New Media

            </button>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="flex gap-4 text-2xl border border-akpica-white mb-3 mr-8 p-2">

          <button onClick={gridView} title="Grid View" className={buttonStyles}>
            <MdGridView />
          </button>
          <button onClick={listView} title="List View" className={buttonStyles}>
            <MdOutlineViewList />
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-1 text-base border border-akpica-white p-1"
              onClick={toggleDropdown}>
              {selectedDateRange} <MdOutlineKeyboardArrowDown />
            </button>
            {/* toggle dropdown */}
            {isOpen && (


              <div className="absolute bg-akpica-black border border-gray-700 p-2 text-base">
                <ul className="list-none p-0 cursor-pointer w-40">
                  <li
                    className="p-2 hover:border-b border-akpica-carlo"
                    onClick={() => handleDateRangeChange("All dates")}
                  >
                    All dates
                  </li>
                  <li
                    className="p-2 hover:border-b border-akpica-carlo hover:bg-gray-700"
                    onClick={() => handleDateRangeChange("Today")}
                  >
                    Today
                  </li>
                  <li
                    className="p-2 hover:border-b border-akpica-carlo hover:bg-gray-700"
                    onClick={() => handleDateRangeChange("Yesterday")}
                  >
                    Yesterday
                  </li>
                  <li
                    className="p-2 hover:border-b border-akpica-carlo hover:bg-gray-700"
                    onClick={() => handleDateRangeChange("This week")}
                  >
                    This week
                  </li>
                  <li
                    className="p-2 hover:border-b border-akpica-carlo hover:bg-gray-700"
                    onClick={() => handleDateRangeChange("This month")}
                  >
                    This month
                  </li>
                  <li
                    className="p-2 hover:border-b border-akpica-carlo hover:bg-gray-700"
                    onClick={() => handleDateRangeChange("This year")}
                  >
                    This year
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>

        {/* views */}

        <div className="flex flex-wrap gap-2 md:mr-8">
          {filteredPosts.length > 0 ? (isGridView ? (
            // Grid view
            posts &&
            posts.map((post) => (
              <div
                style={{
                  backgroundImage: `url(${BACKEND_URL}/posts/photo/${encodeURIComponent(
                    post.title
                  )}?${new Date().getTime()})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="object-cover w-80 h-44 flex items-end">
                  <div className="bg-akpica-black hover:bg-gray-700 p-2 w-full">

                <AuthorDate
                colors={"text-akpica-white"}
                  avatar={`${BACKEND_URL}/photo/${
                    post.author.username
                  }?${new Date().getTime()}`}
                  author={post.author.username}
                  date={new Date(post.date).toDateString()}
                  />
                  </div>
              </div>
            ))
          ) : (
            // List view
            <table className="w-[1407px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  {filteredPosts.map((post, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6">
                        <img
                          src={`${BACKEND_URL}/posts/photo/${post.title}?${new Date().getTime()}`}
                          alt="post image"
                          className="aspect-square w-32 object-cover m-2"
                        />
                      </td>
                      <td
                        scope="row"
                        className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-akpica-white"
                      >
                        <Link to={`${post._id}`}>{post.title}</Link>
                      </td>
                      <td className="px-6 py-4">@{post.author.username}</td>
                      <td className="px-6 py-4 flex gap-3">
                        {post.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded text-xs gap-1 my-12"
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
            )
          ) : (
            <p>No images available for the selected date range.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaDashboard;
