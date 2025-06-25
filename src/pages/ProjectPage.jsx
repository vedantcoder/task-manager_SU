import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { id } = useParams()

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen text-black">
      <h1 className="text-2xl font-semibold mb-4">Project ID: {id}</h1>
      <p className="text-gray-700">This page will eventually show tasks for the selected project.</p>
    </div>
  )
}

export default ProjectPage