import React, { useState } from 'react';
import './pageTask.css';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Handle adding new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Handle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="taskPage">
      <h2>My Tasks</h2>

      {/* Task creation form */}
      <form onSubmit={handleAddTask} className="taskForm">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          className="taskInput"
        />
        <button type="submit" className="addButton">Add Task</button>
      </form>

      {/* Task list */}
      <div className="taskList">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`taskItem ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
