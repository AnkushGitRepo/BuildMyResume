import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-11 h-11 bg-gray-300 rounded-full"
        />
      </div>
    )
  );
};

export default ProfileInfoCard;
