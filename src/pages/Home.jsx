import React from 'react'
import ProjectCard from '../components/ProjectCard'

function Home() {
  // Dummy data for now
  const projects = [
    { id: 1, name: "Website Redesign", description: "Revamp the college fest website." },
    { id: 2, name: "Inventory Tracker", description: "Track SU event resources and equipment." },
    { id: 3, name: "Task Dashboard", description: "This project itself!" }
  ]

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold text-white mb-6">Your Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}


export default Home
