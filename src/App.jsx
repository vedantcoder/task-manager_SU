import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<div className="p-6 text-3xl">Home Page</div>} />
      <Route path="/projects/:id" element={<div className="p-6 text-3xl">Project Page</div>} />
    </Routes>
    </>
  );
}

export default App;