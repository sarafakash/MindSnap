import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/signin"); 
    };

    return (
        <button
            onClick={handleLogout}
            className="p-2 bg-gray-700 text-white rounded-md h-9 text-center pl-3 hover:ring hover:ring-black flex justify-center items-center"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
