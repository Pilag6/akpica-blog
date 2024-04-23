import { useState } from "react";
import Axios from "axios";
// UseNavigate
import { useNavigate } from "react-router-dom";

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
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Username</label>
                    <br />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>

            {/* {error && <p>{error}</p>} */}
        </>
    );
};
export default Register;
