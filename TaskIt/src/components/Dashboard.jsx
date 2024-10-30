import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import CreateTask from './CreateTask';
import '../styles.css'

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const handleTaskSelect = async (task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`);
      const taskDetails = await response.json();
      setSelectedTask(taskDetails);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTaskOpen = () => {
    setIsCreateTaskOpen(true);
  };

  const handleCreateTaskClose = () => {
    setIsCreateTaskOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="task-list-container">
        <TaskList onTaskSelect={handleTaskSelect} />
      </div>
      <div className="task-detail-container">
        {selectedTask && <TaskDetail task={selectedTask} />}
      </div>
      <button className="create-task-button" onClick={handleCreateTaskOpen}>
        Create Task
      </button>
      <CreateTask isOpen={isCreateTaskOpen} onClose={handleCreateTaskClose} />
    </div>
  );
};

export default Dashboard;