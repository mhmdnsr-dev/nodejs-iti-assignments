import { Router } from 'express';
import validation from '../middleware/validation/validation.js';
import taskSchema from '../middleware/validation/task.Schema.js';
import tokenVerify from '../middleware/token/authorization.js';
import taskCtr from '../controller/taskController.js';

const app = Router();

app.post('/add-task', validation(taskSchema.add), tokenVerify, taskCtr.addTask);

app.patch(
  '/update-task:id',
  validation(taskSchema.update),
  tokenVerify,
  taskCtr.updateTask
);

app.delete('/delete:id', tokenVerify, taskCtr.deleteTask);

app.get('/tasks', tokenVerify, taskCtr.allTasks);

// app.get('/not-deadline')

export default app;
