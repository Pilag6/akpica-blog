import { useState } from "react";

import useAuth from "@utils/useAuth.js";

// Assets
import logoWhite from "../assets/logo-white.png";

// Icons
import { PiLockKey } from "react-icons/pi";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="mx-auto flex h-screen bg-akpica-black">
            <div className="h-screen flex-1">
                <img
                    className="h-screen object-cover object-center"
                    src="https://bit.ly/3xP8eom"
                    alt=""
                />
            </div>

            <div className="flex h-screen flex-1 flex-col justify-center">
                <img
                    className="flex justify-center items-center mx-auto "
                    src={logoWhite}
                    alt=""
                    width={180}
                />
                <form
                    onSubmit={handleLogin}
                    className="mx-auto flex w-2/4 flex-col items-center justify-center"
                >
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white relative">
                        <FaUserAstronaut />
                        <input
                            className="w-full bg-transparent text-akpica-white outline-none"
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-akpica-white">
                        <PiLockKey />
                        <input
                            type={visible ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent text-akpica-white outline-none "
                            placeholder="Password"
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
                    <button className="mt-7 w-full py-4 text-2xl font-semibold text-akpica-white outline-none outline-white transition-all hover:bg-akpica-pastel hover:text-zinc-800 hover:outline-2">
                        Login
                    </button>
                    <div className="w-full outline-akpica-white">
                        {error && (
                            <div className="mt-7 w-full py-4 px-6 text-2xl font-semibold text-akpica-white transition-all bg-akpica-tomato flex items-center gap-1">
                                <MdError /> {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;