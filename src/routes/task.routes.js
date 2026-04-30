import express from 'express';
const router = express.Router();
import * as taskController from '../controllers/task.controller.js';

import { auth } from '../middleware/auth.middleware.js';

router.use(auth);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;