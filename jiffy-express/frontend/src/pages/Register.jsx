import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const data = await registerUser(
                name,
                email,
                password
            );

            if (data.message !== "Register berhasil") {
                setMessage(
                    data.message || "Register gagal"
                );
                return;
            }

            setMessage(
                "Register berhasil! Mengarahkan ke login..."
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

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
                    Buat akun baru
                </p>

                <h2>Register</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Nama</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Nama lengkap"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Email"
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
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Register
                    </button>

                </form>

                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}

                <p className="switch-page">
                    Sudah punya akun?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;