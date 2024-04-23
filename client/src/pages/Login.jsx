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
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button>Login</button>
            </form>
            <div>{<p>{error}</p>}</div>
        </>
    );
};
export default Login;
