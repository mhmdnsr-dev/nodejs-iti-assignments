"use strict";
import mongoose from "mongoose";

const initConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://test-test:test-test@cluster0.3ewicv5.mongodb.net/user-post?retryWrites=true&w=majority"
    );
    console.log("connection done");
  } catch (error) {
    console.log("could not connect");
  }
};

export default initConnection;
