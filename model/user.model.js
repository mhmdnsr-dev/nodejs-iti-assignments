import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: Schema.Types.String,
  email: { type: Schema.Types.String, unique: true },
  password: Schema.Types.String,
  age: Schema.Types.Number,
});

const userModel = model('User', schema);

export default userModel;
