import Axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/admin");
                setAdmin(res.data.user);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await Axios.get("http://localhost:3300/posts");
                setPosts(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            <section className="flex justify-between">
                <div>
                    {posts ? (
                        posts.map((post, index) => (
                            <div key={index} className="flex gap-2">
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <p>{new Date(post.date).toDateString()}</p>
                                <p>{post.author}</p>
                            </div>
                        ))
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>

                <div>
                    {admin ? (
                        admin.map((user, index) => (
                            <div key={index}>
                                <h2>{user.username}</h2>
                            </div>
                        ))
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>
            </section>
        </div>
    );
};
export default Dashboard;
