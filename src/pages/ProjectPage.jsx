import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import projects from '../data/projects';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';


const ProjectPage = () => {
  const storedProjects = localStorage.getItem("projects");
  const projects = storedProjects ? JSON.parse(storedProjects) : [];
  const { id } = useParams();
  const projectId = id;
  const project = projects.find((p) => p.id === projectId);

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
        t.id === taskBeingEdited.id ? { ...t, ...task } : t
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

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen space-y-6">
      {/* Project Info */}
      <div
        className="bg-white border-l-[6px] p-5 rounded-xl shadow-md"
        style={{ borderColor: project.color }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h1>
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

      {/* Tasks Section */}
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-400 italic pt-20">No tasks added yet.</div>
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
                {filteredTasks
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