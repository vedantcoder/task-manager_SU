import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import AllTasksPage from './pages/AllTasks'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App