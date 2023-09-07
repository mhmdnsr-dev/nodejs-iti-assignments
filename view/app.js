import initConnection from '../db/connection.js';

import userRoutes from './user.routes.js';

import msgRoutes from './msg.routes.js';

import express from 'express';

const app = () => {
  initConnection('mongodb://localhost:27017/saraha');

  const app = express();

  app.use(express.json());

  app.use(userRoutes);
  app.use(msgRoutes);

  app.listen(3000);
};

export default app;
