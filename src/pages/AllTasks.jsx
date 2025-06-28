import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    const storedProjects = localStorage.getItem("projects");
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    setProjects(storedProjects ? JSON.parse(storedProjects) : []);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesProject = projectFilter === "" || task.projectId === projectFilter;
    const matchesPriority = priorityFilter === "" || task.priority === priorityFilter;
    const matchesAssignee =
      assigneeFilter === "" || task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase());
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesProject && matchesPriority && matchesAssignee && matchesSearch;
  });

  const handleDeleteTask = (taskId) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    setTasks(updated);
    localStorage.setItem("taskList", JSON.stringify(updated));
  };

  const handleEditTask = () => {
    alert("Editing tasks is only supported from their respective project pages.");
  };

  const handleToggleComplete = (taskId) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem("taskList", JSON.stringify(updated));
  };

  const handleResetFilters = () => {
    setPriorityFilter("");
    setProjectFilter("");
    setAssigneeFilter("");
    setSearchTerm("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📋 All Tasks</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-3">

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="text"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            placeholder="Filter by Assignee"
            className="p-2 border rounded text-sm"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title/description"
            className="p-2 border rounded text-sm"
          />
        </div>

        <button
          onClick={handleResetFilters}
          className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-full text-gray-700"
        >
          Reset Filters
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400 italic pt-20">No matching tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasksPage;