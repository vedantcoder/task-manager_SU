import { useParams } from 'react-router-dom'
import projects from '../data/projects'

const ProjectPage = () => {
  const { id } = useParams()
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-screen text-center text-gray-500">
        <p>Project not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen space-y-6">
      {/* Project Info Box */}
      <div
        className="bg-white border-l-[6px] p-5 rounded-xl shadow-md"
        style={{ borderColor: project.color }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h1>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* Task Section Placeholder */}
      <div className="text-gray-500 text-sm italic">
        Tasks will be displayed here soon...
      </div>
    </div>
  )
}

export default ProjectPage;