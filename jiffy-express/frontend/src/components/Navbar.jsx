import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <h2>Jiffy Express</h2>
            </div>

            <div className="navbar-user">

                <span>
                    Halo, {user?.name || "User"}
                </span>

                <button
                    onClick={handleLogout}
                    className="btn-logout"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;