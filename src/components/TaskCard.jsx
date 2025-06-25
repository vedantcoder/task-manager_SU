const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500"
}

function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2 text-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span className={`text-white px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="flex justify-between items-center text-gray-500 text-xs pt-2">
        <span>👤 {task.assignee}</span>
        {task.dueDate && <span>📅 {task.dueDate}</span>}
      </div>
    </div>
  )
}

export default TaskCard;