import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import Button from "../../../components/Button";

const ProjectsDetailFrom = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Projects</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectInfo.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Portfolio Website"
                  type="text"
                  value={project.title || ""}
                  onChange={
                    ({ target }) =>
                    updateArrayItem(index, "title", target.value)
                  }
                />
              </div>

              <div className="col-span-2 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Short description about the project"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows={3}
                  value={project.description || ""}
                  onChange={
                    ({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>

              <Input
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                type="url"
                value={project.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
              />

              <Input
                label="Live Demo URL"
                placeholder="https://yourproject.live"
                type="url"
                value={project.liveDemo || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
              />
            </div>

            {projectInfo.length > 1 && (
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
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
          hideArrow={true}
          className="w-auto self-start"
        >
          <div className="flex items-center gap-2">
            <LuPlus /> Add Project
          </div>
        </Button>
      </div>
    </div>
};

export default ProjectsDetailFrom;
