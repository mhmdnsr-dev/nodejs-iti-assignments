'use strict';
import express from 'express';
import fs from 'fs';
// const express = require('express');
// const fs = require('fs');

const getPosts = () => JSON.parse(fs.readFileSync('./data/posts.json'));
const setPosts = post =>
  fs.writeFileSync('./data/posts.json', JSON.stringify(post));

const app = express.Router();

app.get('/posts', (req, res) => {
  res.status(200).json(getPosts());
});
app.post('/add-post', (req, res) => {
  const postAdd = req.body;
  const posts = getPosts();
  const isExsist = posts.find(post => post.id === postAdd.id);
  if (isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This post already exists' });
  } else {
    posts.push(postAdd);
    setPosts(posts);
    res.status(200).json(postAdd);
  }
});
app.get('/reverse-posts', (req, res) => {
  res.status(200).json(getPosts().reverse());
});
app.delete('/del-post', (req, res) => {
  const { id } = req.body;
  const posts = getPosts();
  const isExsist = posts.find(post => post.id === id);
  if (!isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This post does not exist' });
  } else {
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
    res.status(200).json({ message: 'The post has been deleted' });
  }
});
app.put('/up-post', (req, res) => {
  const posts = getPosts();
  const newPost = req.body;
  const isExsist = posts.find(post => post.id === newPost.id);
  if (!isExsist) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This post does not exist' });
  } else {
    const newPosts = posts.map(post => {
      if (post.id === newPost.id) post = newPost;
      return post;
    });

    setPosts(newPosts);
    res.status(200).json(newPost);
  }
});
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  const targetPost = getPosts().find(post => post.id === +id);
  if (!targetPost) {
    res.statusMessage = ' Bad Request';
    res.status(400).json({ message: 'This post does not exist' });
  } else {
    res.status(200).json(targetPost);
  }
});

export default app;
// module.exports = app;
