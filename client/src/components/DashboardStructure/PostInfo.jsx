import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

//Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const PostInfo = () => {
    const { id } = useParams();
    const [singlePost, setSinglePost] = useState([]);

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const response = await Axios.get(
                    `${BACKEND_URL}/posts/${id}`
                );
                setSinglePost(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSinglePost();
    }, [id]);

    return (
        <>
            <div>
                <h1>{singlePost.title}</h1>
                <p>{singlePost.content}</p>
                {/* Add other post details as needed */}
            </div>
        </>
    );
};
export default PostInfo;
