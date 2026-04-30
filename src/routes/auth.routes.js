import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// AUTH ROUTES (correctly wired to controllers)

router.post('/register', register);
router.post('/login', login);

// optional simple test routes
router.get('/register', (req, res) => {
  res.send('Register Page');
});

router.get('/login', (req, res) => {
  res.send('Login Page');
});

export default router;