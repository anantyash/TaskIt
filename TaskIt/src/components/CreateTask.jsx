import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/tasks', { title, description })
      .then(response => {
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`create-task-popup ${isOpen ? 'open' : ''}`}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <button type="submit">Create Task</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CreateTask;