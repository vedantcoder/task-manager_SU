import React from 'react'

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition border-l-[6px]" style={{ borderColor: project.color }}>
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectCard
