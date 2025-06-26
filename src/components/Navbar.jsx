import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav className="bg-[#1a1a2e] text-white px-6 py-2 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left - Logo and Title */}
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="BITS Pilani" className="h-12 w-auto object-contain" />
          <span className="text-2xl font-bold tracking-wide">TaskBoard</span>
        </Link>

        {/* Right - Add Project */}
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
          + Add Project
        </button> */}
      </div>
    </nav>
  )
}

export default Navbar