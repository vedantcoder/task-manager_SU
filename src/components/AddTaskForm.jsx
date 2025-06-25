import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status,
      assignee,
      dueDate,
    };

    onAddTask(newTask); // Parent handles adding to the right project
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStatus('todo');
    setAssignee('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Add New Task</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 border rounded"
      />

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

      </div>

      <input
        type="text"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        placeholder="Assignee Name"
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
