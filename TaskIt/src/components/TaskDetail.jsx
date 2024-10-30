import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskDetail = ({ task, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleEditTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed }),
      });
      const updatedTask = await response.json();
      onEditTask(updatedTask);
      setIsEditing(false);
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Error updating task!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="task-detail">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <br />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
          <br />
          <button onClick={handleEditTask}>Save Changes</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;