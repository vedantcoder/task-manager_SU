const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

function TaskCardHome({ task, onStatusChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-full">
      {/* Title & Priority */}
      <div className="flex justify-between items-center">
        <h3
          className={`font-semibold text-gray-800 text-base ${
            task.status === "done" ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`text-white px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2">{task.description}</p>

      {/* Assignee & Due Date */}
      <div className="flex justify-between items-center text-gray-500 text-xs mt-3">
        <span>👤 {task.assignee}</span>
        {task.dueDate && <span>📅 {task.dueDate}</span>}
      </div>

      {/* Status Selector */}
      <div className="mt-3">
        <label className="text-xs text-gray-500 block mb-1">Status:</label>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="w-full text-xs bg-gray-100 text-gray-800 border rounded px-2 py-1 focus:outline-none"
        >
          <option value="todo">📋 To Do</option>
          <option value="in-progress">⚙️ In Progress</option>
          <option value="done">✅ Done</option>
        </select>
      </div>

    </div>
  );
}

export default TaskCardHome;