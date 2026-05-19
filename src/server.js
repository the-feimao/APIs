import 'dotenv/config';
import express from 'express';
import cors from 'cors';

//import routes
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

//middlewares
app.use(express.json());

//API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/api', (req, res) => {
  res.send('Hello, World!');
});
const PORT = process.env.PORT || 5001;


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});