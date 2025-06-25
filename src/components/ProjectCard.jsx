import React from 'react'

const ProjectCard = ({project}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
    </div>
  )
}

export default ProjectCard
