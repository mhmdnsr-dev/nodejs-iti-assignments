import initConnection from './db/connection.js';
import express from 'express';
import userRoutes from './view/user.routes.js';
import taskRoutes from './view/task.routes.js';
import 'dotenv/config';

try {
  await initConnection(
    `mongodb+srv://${process.env.MONGODB_CONNECT_USER}:${process.env.MONGODB_CONNECT_PASS}@cluster0.3ewicv5.mongodb.net/trello-app?retryWrites=true&w=majority`
  );
  console.log('Connection to db is done');
} catch (error) {
  console.error(error);
}

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.listen(3000);
