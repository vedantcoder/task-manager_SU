import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import projects from '../data/projects';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectPage = () => {
  const storedProjects = localStorage.getItem("projects");
  const projects = storedProjects ? JSON.parse(storedProjects) : [];
  const { id } = useParams();
  const projectId = id;
  const project = projects.find((p) => p.id === projectId);

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");


  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem('taskList');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const filteredTasks = taskList.filter((task) => task.projectId === projectId);

  const handleAddTask = (task) => {
    let updatedTasks;

    if (taskBeingEdited) {
      // Edit mode
      updatedTasks = taskList.map((t) =>
      t.id === taskBeingEdited.id
        ? { ...t, ...task, projectId: t.projectId, status: task.status || t.status }
        : t
      );
    } else {
      // Add mode
      const taskWithProject = {
        ...task,
        id: Date.now().toString(),
        projectId,
      };
      updatedTasks = [...taskList, taskWithProject];
    }
    
    setTaskList(updatedTasks);
    
    setPriorityFilter("");
    setAssigneeFilter("");
    setSearchTerm("");
    setSortOption("dueDate");
    
    setShowForm(false);
    setTaskBeingEdited(null);

  };

  const handleEditTask = (task) => {
    setTaskBeingEdited(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    const updated = taskList.filter((task) => task.id !== taskId);
    setTaskList(updated);
  };

  const handleStatusChange = (taskId, newStatus) => {
  const updatedTasks = taskList.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
  setTaskList(updatedTasks);
};

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const statusLabels = {
    todo: { title: 'To Do', icon: '📝', color: 'border-blue-400' },
    'in-progress': { title: 'In Progress', icon: '⚙️', color: 'border-yellow-400' },
    done: { title: 'Done', icon: '✅', color: 'border-green-500' },
  };

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-screen text-center text-gray-500">
        <p>Project not found.</p>
      </div>
    );
  }
const visibleTasks = filteredTasks
  .filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
    const matchesAssignee = assigneeFilter ? task.assignee === assigneeFilter : true;

    return matchesSearch && matchesPriority && matchesAssignee;
  })
  .sort((a, b) => {
    if (sortOption === "dueDate") {
      return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
    }
    if (sortOption === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }
    if (sortOption === "createdAt") {
      return Number(a.id) - Number(b.id); // assuming task.id = Date.now()
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen space-y-6">
      {/* Project Info */}
      <div
        className="bg-white border-l-[6px] p-5 rounded-xl shadow-md"
        style={{ borderColor: project.color }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">📁 {project.name}</h1>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* Add Task Button + Form */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setTaskBeingEdited(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow-md mt-4">
          <AddTaskForm onAddTask={handleAddTask} editingTask={taskBeingEdited} />
        </div>
      )}

    {/* Filter & Search Bar */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 bg-white p-4 rounded-xl shadow-md">
  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 rounded w-full sm:w-1/3"
  />

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="border p-2 rounded w-full sm:w-1/4"
  >
    <option value="">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select
    value={assigneeFilter}
    onChange={(e) => setAssigneeFilter(e.target.value)}
    className="border p-2 rounded w-full sm:w-1/4"
  >
    <option value="">All Assignees</option>
    {Array.from(new Set(visibleTasks.map((t) => t.assignee)))
      .filter(Boolean)
      .map((assignee) => (
        <option key={assignee} value={assignee}>
          {assignee}
        </option>
      ))}
  </select>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="border p-2 rounded w-full sm:w-1/4"
  >
    <option value="">Sort by</option>
    <option value="dueDate">Due Date</option>
    <option value="priority">Priority</option>
    <option value="createdAt">Creation Date</option>
  </select>
</div>

<div className="flex justify-between items-center mb-4">
  <div className="flex flex-wrap gap-2">
    {/* Your filter inputs (selects, inputs) here */}
  </div>

  <button
    onClick={() => {
      setPriorityFilter("");
      setAssigneeFilter("");
      setSearchTerm("");
      setSortOption("dueDate");
    }}
    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition"
  >
    Reset Filters
  </button>
</div>

      {/* Tasks Section */}
      {visibleTasks.length === 0 ? (
        <div className="text-center text-gray-400 italic pt-20">No tasks</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['todo', 'in-progress', 'done'].map((status) => (
            <div
              key={status}
              className={`bg-gray-100 rounded-xl p-4 border-t-4 ${statusLabels[status].color} shadow-sm`}
            >
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <span>{statusLabels[status].icon}</span>
                {statusLabels[status].title}
              </h2>

              <div className="space-y-3">
                {visibleTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
