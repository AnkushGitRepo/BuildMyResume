import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, disabled, readOnly, inputClassName, onDoubleClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type == "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${inputClassName}`}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={disabled}
          readOnly={readOnly}
          onDoubleClick={onDoubleClick}
        />

        {type === "password" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-gray-500 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-gray-500 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
