import React from 'react'
import ProjectCard from '../components/ProjectCard'
import {Link} from 'react-router-dom'
import projects from '../data/projects'

function Home() {
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
