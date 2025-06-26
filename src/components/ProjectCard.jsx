import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onEdit, onDelete }) {
  const lightTint = `${project.color}20`;

  return (
    <div
      className="rounded-2xl shadow-md hover:shadow-lg transition border-l-[6px] flex flex-col justify-between min-h-[220px] bg-gradient-to-br"
      style={{
        borderColor: project.color,
        backgroundImage: `linear-gradient(to bottom right, ${lightTint}, #ffffff)`,
      }}
    >
      <div className="p-6 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          📁 {project.name}
        </h2>
        <p className="text-gray-600 text-sm">{project.description}</p>
      </div>

      <div className="border-t px-6 py-4 flex items-center justify-between text-sm">
        <Link
          to={`/project/${project.id}`}
          className="text-blue-600 hover:underline font-semibold"
        >
          View Tasks →
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;