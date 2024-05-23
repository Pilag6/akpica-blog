import { useState } from "react";
import Axios from "axios";
// UseNavigate
import { useNavigate } from "react-router-dom";

// Assets
import logoWhite from "../assets/logo-white.png";

// Icons
import { FaUserAstronaut } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiLockKey } from "react-icons/pi";
import { MdError } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

//Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const Register = () => {
    // UseNavigate
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    // console.log(error);

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = { username, email, password, role };
        try {
            const response = await Axios.post(
                `${BACKEND_URL}/register`,
                user,
                { withCredentials: true }
            );

            // UseNavigate
            if (response.status === 201) {
                navigate("/dh-admin/dashboard");
            }
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    return (
        <div className="mx-auto flex h-[calc(100vh-80px)] bg-akpica-black">
            <div className="flex flex-1">
                <img
                    className="h-full object-cover object-center"
                    src="https://bit.ly/4aPzJfY"
                    alt=""
                />
            </div>
            <div className="flex flex-1 flex-col justify-center">
                <img
                    className="flex justify-center items-center mx-auto "
                    src={logoWhite}
                    alt=""
                    width={180}
                />
                <form
                    onSubmit={handleRegister}
                    className="mx-auto flex w-2/4 flex-col items-center justify-center"
                >
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white">
                        <FaUserAstronaut />
                        <input
                            className="w-full bg-transparent text-akpica-white outline-none"
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white relative">
                        <MdAlternateEmail />
                        <input
                            className="w-full bg-transparent text-akpica-white outline-none"
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white">
                        <PiLockKey />
                        <input
                            className="w-full bg-transparent text-akpica-white outline-none"
                            type={visible ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="p-2"
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            )}
                        </div>
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white">
                    <FaUserCog />
                        <label className="flex gap-2 items-center outline-none cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                className="accent-akpica-pastel w-5 h-5"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Admin
                        </label>

                        <label className="flex gap-2 items-center outline-none cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="guest"
                                className="accent-akpica-pastel w-5 h-5"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Guest
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-7 w-full py-4 text-2xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2"
                    >
                        Register
                    </button>
                    <ul className="w-full mt-6 outline-white flex flex-col gap-3">
                        {error &&
                            error.map((err) =>
                                Object.values(err).map((val) => (
                                    <li
                                        className="bg-akpica-tomato text-xl py-3 px-4 flex gap-1"
                                        key={err.msg}
                                    >
                                        <div>
                                            <MdError className="" />
                                        </div>{" "}
                                        <p>{val}</p>
                                    </li>
                                ))
                            )}
                    </ul>
                </form>
            </div>
        </div>
    );
};
export default Register;
