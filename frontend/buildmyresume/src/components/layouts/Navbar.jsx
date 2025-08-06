import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="h-16 bg-gray-800 border-b border-gray-700/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
            <h2 className="text-lg md:text-xl font-medium text-white leading-5">
              BuildMyResume
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-white">
            Settings
          </Link>
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>

        {user && (
          <Link to="/settings">
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-11 h-11 bg-gray-300 rounded-full"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
