import validation from '../middleware/validation.js';
import userValiSchema from '../controller/user.validation.js';
import userCtr from '../controller/user.controller.js';
import { Router } from 'express';
import auth from '../middleware/auth.js';

const app = Router();

app.post(
  '/signup',
  validation.reqBodyVali(userValiSchema.signupSchema),
  userCtr.signup
);
app.get(
  '/signin',
  validation.reqBodyVali(userValiSchema.signinSchema),

  userCtr.signin
);
app.put(
  '/update-user',
  validation.reqBodyVali(userValiSchema.updateSchema),
  auth(),
  userCtr.updateUser
);

app.delete('/delete-user', auth(), userCtr.deleteUser);

app.get(
  '/users',
  validation.reqQueryVali(userValiSchema.searchSchema),
  userCtr.search
);

export default app;
