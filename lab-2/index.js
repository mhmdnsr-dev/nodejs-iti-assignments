'use strict';

import fs from 'fs';
import express from 'express';
import usersRouter from './modules/users/user.routes.js';
import postsRouter from './modules/posts/post.routes.js';
// const express = require('express');
// const fs = require('fs');
// const usersRouter = require('./modules/users/user.routes.js');
// const postsRouter = require('./modules/posts/post.routes.js');

const welcomePage = fs.readFileSync('./index.html');

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).send(welcomePage);
});

app.use(usersRouter);
app.use(postsRouter);

app.listen(3000);
