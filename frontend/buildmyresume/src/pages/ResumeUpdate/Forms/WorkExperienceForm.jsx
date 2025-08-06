import React from 'react'
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import Button from '../../../components/Button';


const WorkExperienceForm = ({workExperience, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {workExperience.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="ABC Corp"
                type="text"
                value={experience.company || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "company", target.value)
                }
              />

              <Input
                label="Role"
                placeholder="Frontend Developer"
                type="text"
                value={experience.role || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "role", target.value)
                }
              />

              <Input
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
              />

              <Input
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="What did you do in this role?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                rows={3}
                value={experience.description || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "description", target.value)
                }
              />
            </div>

            {workExperience.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}

        <Button
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          hideArrow={true}
          className="w-auto self-start"
        >
          <div className="flex items-center gap-2">
            <LuPlus /> Add Work Experience
          </div>
        </Button>
      </div>
    </div>
  )
}

export default WorkExperienceForm