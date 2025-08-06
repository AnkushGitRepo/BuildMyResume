import React from 'react'
import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector";
import Input from "../../../components/Inputs/Input";

const ProfileInfoForm = ({profileData, updateSection}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h2>

      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={profileData.designation || ""}
            onChange={({ target }) =>
              updateSection("designation", target.value)
            }
            label="Designation"
            placeholder="UI Designer"
            type="text"
          />

          <div className="col-span-2 mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Summary
            </label>

            <textarea
              placeholder="Short Introduction"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              rows={4}
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoForm