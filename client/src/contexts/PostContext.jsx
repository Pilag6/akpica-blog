/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

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
    
    return (
        <PostContext.Provider value={{ posts }}>
        {children}
        </PostContext.Provider>
    );
    };

export default PostContextProvider;