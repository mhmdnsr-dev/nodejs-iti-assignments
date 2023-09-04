'use strict';
import express from 'express';
import fs from 'fs';
// const express = require('express');
// const fs = require('fs');

const getUsers = () => JSON.parse(fs.readFileSync('./data/users.json'));
const setUsers = users =>
  fs.writeFileSync('./data/users.json', JSON.stringify(users));

const app = express.Router();

app.get('/users', (req, res) => {
  res.status(200).json(getUsers());
});
app.post('/add-user', (req, res) => {
  const userAdd = req.body;
  const users = getUsers();
  const isExsist = users.find(user => user.id === userAdd.id);
  if (isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This user already exists' });
  } else {
    users.push(userAdd);
    setUsers(users);
    res.status(200).json(userAdd);
  }
});
app.get('/sorted-users', (req, res) => {
  res.status(200).json(getUsers().sort((a, b) => a.name.localeCompare(b.name)));
});
app.delete('/del-user', (req, res) => {
  const { id } = req.body;
  const users = getUsers();
  const isExsist = users.find(user => user.id === id);
  if (!isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This user does not exist' });
  } else {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
    res.status(200).json({ message: 'The user has been deleted' });
  }
});
app.put('/up-user', (req, res) => {
  const users = getUsers();
  const newUser = req.body;
  const isExsist = users.find(user => user.id === newUser.id);
  if (!isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This user does not exist' });
  } else {
    const newUsers = users.map(user => {
      if (user.id === newUser.id) user = newUser;
      return user;
    });

    setUsers(newUsers);
    res.status(200).json(newUser);
  }
});
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const targetUser = getUsers().find(user => user.id === +id);
  if (!targetUser) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This user does not exist' });
  } else {
    res.status(200).json(targetUser);
  }
});

export default app;
// module.exports = app;
