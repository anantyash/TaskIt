const express = require('express');
const app = express();
const db = require('./Database/db');


app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Add PATCH to the allowed methods
  next();
});


// Use the connection pool to perform database operations
app.get('/tasks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  console.log('Received request to create task');
  console.log('req.body:', req.body);

  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required' });
      return;
    }

    console.log('Creating task with title:', title, 'and description:', description);

    const result = await db.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    console.log('Task created successfully:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({
      message: 'Error creating task',
      error: err.message,
      code: err.code,
    });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [title, description, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
      [title, description, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
});

app.listen(3000);