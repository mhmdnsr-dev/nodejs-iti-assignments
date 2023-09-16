import { Router } from 'express';
import validation from '../middleware/validation/validation.js';
import userSchema from '../middleware/validation/user.Schema.js';
import userCtr from '../controller/userController.js';
import tokenVerify from '../middleware/token/authorization.js';

const app = Router();

// 1. signUp
app.post('/signup', validation(userSchema.signUp), userCtr.signUp);
app.get('/signin', validation(userSchema.signIn), userCtr.signIn);

app.patch(
  '/update-user',
  validation(userSchema.update),
  tokenVerify,
  userCtr.updateUser
);

// app.patch(
//   '/change-pass',
//   validation(userSchema.changePass),
//   tokenVerify,
//   userCtr.changePass
// );

app.delete('/del-user', tokenVerify, userCtr.deleteUser);

app.delete('/soft-del-user', tokenVerify, userCtr.softDelete);

app.delete('/logout', tokenVerify, userCtr.logout);

export default app;
