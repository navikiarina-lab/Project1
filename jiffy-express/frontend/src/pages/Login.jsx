import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const data = await loginUser(
                email,
                password
            );

            if (!data.token) {
                setMessage(
                    data.message || "Login gagal"
                );
                return;
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if (data.user.role === "admin") {
            navigate("/admin");
            } else {
            navigate("/dashboard");
            }

        } catch (error) {
            console.error(error);

            setMessage(
                "Tidak dapat terhubung ke server"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Jiffy Express</h1>

                <p className="subtitle">
                    Shipment Management System
                </p>

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Masukkan email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Login
                    </button>

                </form>

                {message && (
                    <p className="error">
                        {message}
                    </p>
                )}

                <p className="switch-page">
                    Belum punya akun?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;