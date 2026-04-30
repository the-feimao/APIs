import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    console.log('REGISTER HIT:', req.body);

    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    return res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('REGISTER ERROR:', err);

    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (!result.rows.length) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET
    );

    return res.json({ token });

  } catch (err) {
    console.error('LOGIN ERROR:', err);

    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};