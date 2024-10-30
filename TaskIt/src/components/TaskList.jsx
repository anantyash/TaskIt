import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ onTaskSelect }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTaskSelect = (task) => {
    onTaskSelect(task);
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleTaskSelect(task)}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;