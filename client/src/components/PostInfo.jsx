import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const PostInfo = () => {
    const { id } = useParams();
    const [singlePost, setSinglePost] = useState([]);

    console.log(singlePost);

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const response = await Axios.get(`http://localhost:3300/posts/${id}`);
                setSinglePost(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSinglePost();
    }, [id]);

    return <div>
        <div>
            <h1>{singlePost.title}</h1>
            <p>{singlePost.content}</p>
            {/* Add other post details as needed */}
        </div>
    </div>;
};
export default PostInfo;
