import { useState } from "react";
import Axios from "axios";
// UseNavigate
import { useNavigate } from "react-router-dom";

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
        console.log(user);
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
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
            </div>

            <div className="flex h-screen flex-1 flex-col justify-center">
                <h2 className="text-center text-4xl font-semibold mb-10">
                    Login
                </h2>
                <form
                    onSubmit={handleLogin}
                    className="mx-auto flex w-2/4 flex-col items-center justify-center"
                >
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white">
                        <input
                            className="w-full bg-transparent text-white outline-none "
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-2 flex w-full items-center gap-3 border-b-2 border-cyan-50/45 px-4 py-4 text-white">
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
                    <div>
                        {error && (
                            <p className="mt-7 w-full py-4 px-6 text-2xl font-semibold text-white transition-all bg-red-400 hover:text-zinc-800 hover:outline-2">
                                {error}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
