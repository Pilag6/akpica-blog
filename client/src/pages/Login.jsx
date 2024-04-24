import { useState } from "react";
import Axios from "axios";
// UseNavigate
import { useNavigate } from "react-router-dom";

// Assets
import logoWhite from "../assets/logo-white.png";

// Icons
import { PiLockKey } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { MdError } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    console.log(error);

    // UseNavigate
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await Axios.post(
                "http://localhost:3300/login",
                user
            );

            // UseNavigate
            if (response.status === 200) {
                navigate("/dh-amin/dashboard");
            }
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="mx-auto flex h-screen bg-zinc-800">
            <div className="h-screen flex-1">
                <img
                    className="h-screen object-cover object-center"
                    src="https://bit.ly/3xP8eom"
                    alt=""
                />
            </div>

            <div className="flex h-screen flex-1 flex-col justify-center">
                {/* <h2 className="text-center text-4xl font-semibold mb-10">
                    Login
                </h2> */}
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
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white relative">
                        <MdAlternateEmail />
                        <input
                            className="w-full bg-transparent text-white outline-none"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white">
                        <PiLockKey />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent text-white outline-none "
                            placeholder="Password"
                        />
                    </div>
                    <button className="mt-7 w-full py-4 text-2xl font-semibold text-white outline-none outline-white transition-all hover:bg-[#B3C4A2] hover:text-zinc-800 hover:outline-2">
                        Login
                    </button>
                    <div className="w-full outline-white">
                        {error && (
                            <div className="mt-7 w-full py-4 px-6 text-2xl font-semibold text-white transition-all bg-red-400 flex items-center gap-1">
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
