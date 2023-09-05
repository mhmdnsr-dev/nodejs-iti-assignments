import postCtr from "../Controller/post.controller.js";
import { Router } from "express";

const app = Router();

app.get("/posts", postCtr.getAllPosts);

app.post("/add-post", postCtr.addPost);

app.delete("/del-post", postCtr.delPost);

app.put("/up-post", postCtr.updatePost);

export default app;
