import React, { useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(previewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!preview ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full relative cursor-pointer" onClick={onChooseFile}>
          <LuUser className="text-4xl text-blue-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-blue-500/85 to-blue-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onChooseFile(); }}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover cursor-pointer"
            onClick={onChooseFile}
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
