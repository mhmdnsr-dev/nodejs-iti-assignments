import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: Schema.Types.String,
  body: Schema.Types.String,
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  id: { type: Schema.Types.Number, unique: true },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const msgModel = model('Message', schema);

export default msgModel;
