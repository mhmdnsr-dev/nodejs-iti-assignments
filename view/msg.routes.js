import { Router } from 'express';

import validation from '../middleware/validation.js';

import msgValiSchema from '../controller/msg.validation.js';

import msgCtr from '../controller/msg.controller.js';
import auth from '../middleware/auth.js';

const app = Router();

app.post(
  '/add-msg',
  validation.reqBodyVali(msgValiSchema.addSchema),
  auth(),
  msgCtr.addMsg
);

app.delete('/del-msg', auth(), msgCtr.delMsg);

app.get('/get-msgs', msgCtr.getMsgs);

export default app;
