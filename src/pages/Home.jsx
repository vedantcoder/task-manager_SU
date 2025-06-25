import React from 'react'
import ProjectCard from '../components/ProjectCard'
import {Link} from 'react-router-dom'

function Home() {
  // Dummy data for now
const projects = [
  { id: 1, name: "Website Redesign", description: "Revamp the college fest website.", color: "#f43f5e" },
  { id: 2, name: "Inventory Tracker", description: "Track SU event resources and equipment.", color: "#3b82f6" },
  { id: 3, name: "Task Dashboard", description: "This project itself!", color: "#10b981" }
]

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold text-white mb-6">Your Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id}>
            <ProjectCard project={project} />
            </Link>
        ))}
      </div>
    </div>
  )
}


export default Home
