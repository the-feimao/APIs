import pool from '../config/db.js';

export const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description, deadline)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [req.user.userId, title, description, deadline]
  );

  res.json(result.rows[0]);
};

export const getTasks = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1',
    [req.user.userId]
  );

  res.json(result.rows);
};

export const updateTask = async (req, res) => {
  const { title, description, deadline, is_completed } = req.body;

  const result = await pool.query(
    `UPDATE tasks
     SET title=$1, description=$2, deadline=$3, is_completed=$4
     WHERE id=$5 AND user_id=$6
     RETURNING *`,
    [title, description, deadline, is_completed, req.params.id, req.user.userId]
  );

  res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  await pool.query(
    'DELETE FROM tasks WHERE id=$1 AND user_id=$2',
    [req.params.id, req.user.userId]
  );

  res.json({ message: 'Deleted' });
};