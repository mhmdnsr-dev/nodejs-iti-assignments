import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: Number,
    gender: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", usersSchema);

export default userModel;
