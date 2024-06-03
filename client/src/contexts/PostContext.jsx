/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

// Backend URL
import BACKEND_URL from '@utils/backendUrl.js';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [postQuantity, setPostQuantity] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await Axios.get(`${BACKEND_URL}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (posts) {
            setPostQuantity(posts.length);
        } else {
            setPostQuantity(0);
        }
    }, [posts]);

    const addPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setPostQuantity((prevQuantity) => prevQuantity + 1);
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, postQuantity, addPost }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
