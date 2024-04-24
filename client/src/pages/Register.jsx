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

const Register = () => {
    // UseNavigate
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = { username, email, password };
        console.log(user);
        const response = await Axios.post(
            "http://localhost:3300/register",
            user
        );
        console.log(response);

        // UseNavigate
        if (response.status === 201) {
            navigate("/dh-admin/login");
        } else if (response.status === 400) {
            // setError(response.data.message)
            console.log(response.data.message);
        }
    };

    return (
        <div className="mx-auto flex h-screen bg-zinc-800">
            <div className="h-screen flex-1">
                <img
                    className="h-screen object-cover object-center"
                    src="https://bit.ly/4aPzJfY"
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
                    onSubmit={handleRegister}
                    className="mx-auto flex w-2/4 flex-col items-center justify-center"
                >
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white">
                        <FaUserAstronaut />
                        <input
                            className="w-full bg-transparent text-white outline-none"
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white relative">
                        <MdAlternateEmail />
                        <input
                            className="w-full bg-transparent text-white outline-none"
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white">
                        <PiLockKey />
                        <input
                            className="w-full bg-transparent text-white outline-none"
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-7 w-full py-4 text-2xl font-semibold text-white outline-none outline-white transition-all hover:bg-[#B3C4A2] hover:text-zinc-800 hover:outline-2"
                    >
                        Register
                    </button>
                </form>
            </div>

            {/* {error && <p>{error}</p>} */}
        </div>
    );
};
export default Register;
