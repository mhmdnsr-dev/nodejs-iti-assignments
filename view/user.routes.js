"use strict";

import { Router } from "express";
import userCtr from "../Controller/user.controller.js";

const app = Router();

app.get("/users", userCtr.getAllUsers);

app.post("/signup", userCtr.signup);

app.post("/signin", userCtr.signin);

app.put("/up-user", userCtr.updateUser);

app.delete("/del-user", userCtr.deleteUser);

app.get("/user-profile", userCtr.getProfile);

// app.get("/user-profile", (req,res)=>{
// 	res.closed

// 	res.end()
// });

export default app;
