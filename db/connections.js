"use strict";
import mongoose from "mongoose";

const initConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/user-post"
    );
    console.log("connection done");
  } catch (error) {
    console.log("could not connect");
  }
};

export default initConnection;
