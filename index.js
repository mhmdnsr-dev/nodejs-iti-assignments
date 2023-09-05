import express from "express";
import userRoute from "./view/user.routes.js";
import postRoute from "./view/post.routes.js";
import initConnection from "./db/connections.js";

initConnection();

const app = express();

app.use(express.json());

app.use(userRoute);

app.use(postRoute);

app.listen(3000);
