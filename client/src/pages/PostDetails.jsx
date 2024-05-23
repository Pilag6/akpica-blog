import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

//BACKEND URL
import BACKEND_URL from "@utils/backendUrl.js";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await Axios.get(`${BACKEND_URL}/posts/${id}`);
                setPost(response.data);
                console.log("Fetched post:", response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="bg-akpica-white">
            <h1>{post.title}</h1>
            <p>{post.author.username}</p>
        </div>
    );
};

export default PostDetails;
