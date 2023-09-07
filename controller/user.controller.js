import userModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { password } = req.body;
    await userModel.insertMany({
      ...req.body,
      password: bcrypt.hashSync(password, 5),
    });
    res.status(201).json({ ...req.body, password: '*******' });
  } catch (error) {
    const dbErr = error?.writeErrors;
    if (dbErr) res.status(400).json('This user already exists');
    else res.status(500).json(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userModel.find();
    const isUser = users.find(user => user.email === email);
    if (isUser) {
      const isPass = bcrypt.compareSync(password, isUser.password);

      if (isPass) {
        const token = jwt.sign(isUser.email, 'mykey', {
          algorithm: 'HS256',
        });
        res
          .status(200)
          .json({ message: `Welcome ${isUser.name}`, token: token });
      } else res.status(401).json(`Wrong password`);
    } else {
      res.status(400).json(`This user does't exists`);
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = req.headers;
    const targetEmail = jwt.verify(token, 'mykey', {
      algorithm: 'HS256',
    });

    await userModel.updateOne(
      { email: targetEmail },
      {
        ...req.body,
        password: password ? bcrypt.hashSync(password, 5) : undefined,
      }
    );
    const newToken = email ? jwt.sign(email, 'mykey') : undefined;
    res.status(202).json({
      ...req.body,
      ...(password && { password: '**************' }),
      ...(newToken && { newToken }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { token } = req.headers;
    const targetEmail = jwt.verify(token, 'mykey');
    await userModel.deleteOne({ email: targetEmail });
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};

const search = async (req, res) => {
  try {
    const { name, age } = req.query;
    let users;
    if (!name && !age) {
      users = await userModel.find();
      res.status(200).json(users);
    } else {
      users = await userModel.find(
        {
          name: new RegExp(`^${name}.*`, 'i'),
          age: { $lt: age },
        },
        { name: 1, email: 1, age: 1, _id: 0 }
      );

      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  signup,
  signin,
  updateUser,
  deleteUser,
  search,
};
