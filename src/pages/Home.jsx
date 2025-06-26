import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectForm from "../components/AddProjectForm";
import ProjectCard from "../components/ProjectCard";

const HomePage = () => {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddOrEdit = (project) => {
    const updated = editingProject
      ? projects.map((p) => (p.id === project.id ? project : p))
      : [...projects, project];

    setProjects(updated);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
  {/* Header */}
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
    <button
      onClick={() => {
        setShowForm(!showForm);
        setEditingProject(null);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition"
    >
      {showForm ? "Cancel" : "+ New Project"}
    </button>
  </div>

  {/* Add Project Form */}
  {showForm && (
    <div className="bg-white p-6 rounded-xl shadow border">
      <ProjectForm
        onSubmit={handleAddOrEdit}
        initialData={editingProject}
        onCancel={() => {
          setShowForm(false);
          setEditingProject(null);
        }}
      />
    </div>
  )}

  {/* Project Cards or Empty State */}
  {projects.length === 0 ? (
    <div className="text-center text-gray-400 py-32 space-y-4">
      <p className="text-lg italic">You haven't added any projects yet.</p>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold"
      >
        + Create your first project
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )}
</div>

  );
};

export default HomePage;