import { useState, useEffect } from "react";

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

  useEffect(() => {
  console.log("Form Loaded", initialData);
}, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{initialData?.id ? "Edit Project" : "New Project"}</h2>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <div>
        <label className="block text-sm mb-1">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded text-sm"
        >
          {initialData?.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;