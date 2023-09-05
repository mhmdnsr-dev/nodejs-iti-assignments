"use strict";

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    reactions: Number,
    userId: {
      type: String,
      require: true,
    },
    postId: {
      type: Number,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
