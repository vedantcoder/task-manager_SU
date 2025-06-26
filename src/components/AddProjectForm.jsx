import { useState } from "react";

const ProjectForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [color, setColor] = useState(initialData?.color || "#3b82f6");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: initialData?.id || Date.now().toString(),
      name,
      description,
      color,
    };

    onSubmit(newProject);
  };

  // useEffect(() => {
  //   console.log("Form Loaded", initialData);
  // }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl shadow-xl space-y-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {initialData?.id ? "Edit Project" : "New Project"}
      </h2>

      {/* Project Name & Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Project Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 p-1 border rounded-md cursor-pointer"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project (optional)"
          className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {initialData?.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;