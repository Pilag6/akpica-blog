import { PostContext } from "@contexts/PostContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MediaDashboard = () => {
  const { posts } = useContext(PostContext);

  return (
    <>
      <div className="bg-akpica-white flex flex-col pt-6 pb-3 pl-8">
        <h1 className="text-xl font-extrabold mb-8">Media Library</h1>
        <div className="grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 pr-8">
          {posts &&
            posts.map((post) => (
              <img
                key={post._id}
                src={`http://localhost:3300/posts/photo/${
                  post.title
                }?${new Date().getTime()}`}
                alt="post image"
                className="object-cover mb-8 h-full"
              />
            ))}

        {/* {users && users.map((user) => (
           <img
           className="w-10 h-10 rounded-full object-cover object-center"
           // Change the src to the custom avatar

           src={`http://localhost:3300/photo/${
               user.username
           }?${new Date().getTime()}`}
           alt=""
       />
        ))} */}

        </div>
      </div>
    </>
  );
};

export default MediaDashboard;
