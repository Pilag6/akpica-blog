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

const Register = () => {
    // UseNavigate
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    // console.log(error);

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = { username, email, password };
        try {
            const response = await Axios.post(
                "http://localhost:3300/register",
                user
            );

            // UseNavigate
            if (response.status === 201) {
                navigate("/dh-admin/login");
            }
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    return (
        <div className="mx-auto flex h-screen bg-akpica-black">
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
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                                        <div><MdError className=""/></div> <p>{val}</p>
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
