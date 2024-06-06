import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

//Backend URL
import BACKEND_URL from "@utils/backendUrl.js";


// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const UserProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    // MESSAGES
    const [updateMessage, setUpdateMessage] = useState("");
    const [invalidEmail, setInvalidEmail] = useState("");
    const [invalidPassword, setInvalidPassword] = useState("");

    // password
    const [newPassword, setNewPassword] = useState("");
    const [isVisibleNew, setIsVisibleNew] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

    // User picture
    const [userPicture, setUserPicture] = useState(null);

    // Fetch the admin data
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await Axios.get(
                    `${BACKEND_URL}/admin/${id}`,
                    { withCredentials: true }
                );
                setAdmin(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdmin();
    }, [id]); // This works only when the component mounts

    const handleFileChange = (e) => {
        setUserPicture(URL.createObjectURL(e.target.files[0]));
    };

    const handleChangePicture = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        try {
            await Axios.patch(
                `${BACKEND_URL}/admin/editPicture/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                },
                { withCredentials: true }
            );

            // After successful update, fetch the updated admin data
            setUpdateMessage("Picture updated successfully");
            setTimeout(() => {
                setUpdateMessage("");
            }, 3000); // 3 seconds

            const res = await Axios.get(`${BACKEND_URL}/admin/${id}`, {
                withCredentials: true
            });
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                picture: res.data.user.picture
            }));
            setUserPicture(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (invalidEmail) {
            setInvalidEmail("Can't save changes: Invalid email address");
            return; // Exit the function if the email is invalid
        }
        const email = admin.email;
        const fullname = admin.fullname;
        const role = admin.role;
        const password = admin.password;

        if (newPassword !== confirmPassword) {
            setInvalidPassword("Password does not match");
            return;
        }

        if (
            newPassword.toLowerCase().includes(admin.username) ||
            newPassword.toLowerCase().includes(email.toLowerCase().substring(0, email.indexOf("@")))
        ) {
            setInvalidPassword(
                "Password should not contain the username or your email"
            );
            return;
        }

        try {
            await Axios.patch(
                `${BACKEND_URL}/admin/editUserInfo/${id}`,
                {
                    email,
                    fullname,
                    password: newPassword,
                    role
                },
                { withCredentials: true }
            );

            const res = await Axios.get(`${BACKEND_URL}/admin/${id}`, {
                withCredentials: true
            });

            setAdmin({
                ...admin,
                email: res.data.user.email,
                fullname: res.data.user.fullname,
                password: res.data.user.password,
                role: res.data.user.role
            });

            setNewPassword(password);

            // Navigate to the admin profile page
            navigate(`/dh-admin/dashboard/usersDashboard`);
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            setInvalidEmail("Invalid email address");
        } else {
            setInvalidEmail("");
        }

        setAdmin((prevAdmin) => ({
            ...prevAdmin,
            email: email
        }));
    };

    return (
        <>
            <div className="flex flex-col items-start md:pt-16 pt-8 h-[calc(100vh-80px)]">
                {admin && (
                    <div className="flex md:flex-row flex-col md:items-start items-center gap-8 md:gap-0 md:w-4/6">
                        <div className="flex flex-col items-center md:w-2/5">
                            <h1 className="text-3xl font-semibold mb-8 text-akpica-white">
                                {admin && admin.fullname}
                            </h1>
                            <img
                                className="w-40 h-40 rounded-full mb-8  object-center border-4 border-akpica-white"
                                src={
                                    userPicture
                                        ? userPicture
                                        : `${BACKEND_URL}/photo/${
                                              admin.username
                                          }?${new Date().getTime()}`
                                }
                                alt=""
                            />
                            <form
                                onSubmit={handleChangePicture}
                                className="flex flex-col items-center"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    name="userpicture"
                                    onChange={handleFileChange}
                                    placeholder="Update Picture"
                                    className="block text-xs text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                />
                                <div className="flex items-center justify-between gap-4">
                                    {userPicture && (
                                        <div className="flex items-center justify-between gap-4 my-6">
                                            <button
                                                className="p-2 font-semibold bg-akpica-tomato text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                                onClick={() =>
                                                    setUserPicture(null)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="p-2 font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                            >
                                                Update Picture
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Add a text after click in Update Picture button for 3 seconds and then disappear */}
                                {updateMessage && (
                                    <p className="text-akpica-white bg-akpica-green p-2 mt-5">
                                        {updateMessage}
                                    </p>
                                )}
                            </form>
                        </div>

                        <div className="flex flex-col gap-4 text-akpica-white px-8 md:px-0">
                            <div className="flex items-center gap-4 ">
                                <label className="w-1/4">Username:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-2 pl-2 py-1 opacity-40"
                                    readOnly
                                    type="text"
                                    placeholder={admin.username}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Email:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type="email"
                                    value={admin ? admin.email : ""}
                                    placeholder={admin.email}
                                    onChange={handleChangeEmail}
                                    required
                                />
                            </div>
                            {invalidEmail && (
                                <p className="text-akpica-tomato text-right">
                                    {invalidEmail}
                                </p>
                            )}
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Full Name:</label>
                                <input
                                    className="flex-1 bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type="text"
                                    value={admin && admin.fullname}
                                    placeholder={admin.fullname}
                                    onChange={(e) => {
                                        setAdmin({
                                            ...admin,
                                            fullname: e.target.value
                                        });
                                    }}
                                    maxLength={30}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="w-1/4">Role:</label>
                                <div className="flex flex-1 justify-around bg-transparent text-akpica-white outline-none border-[1px] px-2 py-1">
                                    <label className="rounded-none outline-none cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            checked={
                                                admin && admin.role === "admin"
                                            }
                                            onChange={(e) =>
                                                setAdmin({
                                                    ...admin,
                                                    role: e.target.value
                                                })
                                            }
                                            className="accent-akpica-pastel"
                                        />{" "}
                                        Admin
                                    </label>
                                    <label className="rounded-none outline-none cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="guest"
                                            checked={
                                                admin && admin.role === "guest"
                                            }
                                            onChange={(e) =>
                                                setAdmin({
                                                    ...admin,
                                                    role: e.target.value
                                                })
                                            }
                                            className="accent-akpica-pastel py-1 px-4"
                                        />{" "}
                                        Guest
                                    </label>
                                </div>
                            </div>

                            <h1 className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 p-4 text-akpica-white text-xl">
                                Change Password
                            </h1>
                            <div className="flex items-center gap-4">
                                <label className="w-1/2">New Password:</label>
                                <input
                                    className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type={isVisibleNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <div
                                    className="p-2"
                                    onClick={() =>
                                        setIsVisibleNew(!isVisibleNew)
                                    }
                                >
                                    {!isVisibleNew ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="w-1/2">
                                    Confirm New Password:
                                </label>
                                <input
                                    className="bg-transparent text-akpica-white outline-none border-[1px] pl-2 py-1"
                                    type={
                                        isVisibleConfirm ? "text" : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <div
                                    className="p-2"
                                    onClick={() =>
                                        setIsVisibleConfirm(!isVisibleConfirm)
                                    }
                                >
                                    {!isVisibleConfirm ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </div>
                            </div>
                            {invalidPassword && (
                                <p className="text-akpica-tomato text-right">
                                    {invalidPassword}
                                </p>
                            )}

                            <button
                                className="my-7 w-full py-2 text-xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default UserProfile;
