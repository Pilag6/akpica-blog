import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const UserProfile = () => {
    const { id } = useParams();

    const [admin, setAdmin] = useState(null);
    const [picture, setPicture] = useState(null);
    console.log(admin);
    console.log(picture);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get(
                    `http://localhost:3300/admin/edit/${id}`
                );
                console.log(res.data.user);
                setAdmin(res.data.user);
                // console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        try {
            await Axios.post(`http://localhost:3300/admin/edit/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const { data } = await Axios.patch(`http://localhost:3300/admin/edit/${id}`);
        setPicture(data);
    }


    return (
        <>
            <div className="flex flex-col items-center pt-8">
                <h1 className="text-3xl font-semibold mb-8">
                    {admin && admin.fullname}
                </h1>

                {admin && (
                    <div className="flex flex-col">
                        <div className="flex flex-col items-center">
                            <img
                                src={`http://localhost:3300/photo/${admin.username}`}
                                alt=""
                            />
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    name="userpicture"
                                    placeholder="Update Picture"
                                />
                            </form>
                            <button
                                className="my-7 w-full py-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                onClick={handleClick}
                            >
                                Update Picture
                            </button>
                        </div>
                        <div>
                            <h1>Username: {admin.username}</h1>
                            <h1>Email: {admin.email}</h1>
                            <h1>Full Name: {admin.fullname}</h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default UserProfile;
