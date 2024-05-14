/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const MAIN_URL = 'http://localhost:3300/posts';
    
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await Axios.get(MAIN_URL);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
        
    }, []);

    // Set quantity of posts

    useEffect(() => {
        if (posts) {
            setQuantity(posts.length);
        } else {
            setQuantity(0);
        }
    }, [posts]);
    
    return (
        <PostContext.Provider value={{ posts, quantity }}>
        {children}
        </PostContext.Provider>
    );
    };

export default PostContextProvider;