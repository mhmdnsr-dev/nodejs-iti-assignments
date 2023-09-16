import userModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import updateTokens from '../helper/updateTokens.js';

const signUp = async (req, res) => {
  try {
    await userModel.insertMany({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 5),
      isVerified: false,
      isDeleted: false,
    });

    return res.status(201).json({ ...req.body, password: '*******' });
  } catch (err) {
    if (err.writeErrors)
      return res.status(409).json('Email or phone number already exists');
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

// 2) signin
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await userModel.findOne({ email: email });

    let isPass = false;
    if (isExist) {
      if (isExist.isDeleted)
        return res
          .status(403)
          .json('You do not have permission to execute the request');
      isPass = bcrypt.compareSync(password, isExist.password);
      if (isPass) {
        const payload = { userId: isExist._id };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          noTimestamp: true,
        });

        updateTokens(tokens => tokens.filter(t => t !== token));

        return res.status(200).json({ token });
      }
    }

    return res.status(404).json('Wrong email or password');
  } catch (err) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

// 3) update user
const updateUser = async (req, res) => {
  try {
    const { oldPass, newPass } = req.body;
    const { authorization } = req.headers;

    const payload = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findOne({ _id: payload.userId });

    // If "newPass" is present, "oldPass" must be present.
    if (newPass) {
      const isPass = bcrypt.compareSync(oldPass, user.password);
      if (isPass) {
        await userModel.updateOne(
          { _id: payload.userId },
          { ...req.body, password: bcrypt.hashSync(newPass, 5) }
        );
        const user = await userModel.findOne(
          { _id: payload.userId },
          { _id: 0, __v: 0, isDeleted: 0, isVerified: 0, password: 0 }
        );
        return res.status(202).json(user);
      } else return res.status(406).json('Incorrect password');
    } else {
      await userModel.updateOne({ _id: payload.userId }, { ...req.body });

      const user = await userModel.findOne(
        { _id: payload.userId },
        { _id: 0, __v: 0, isDeleted: 0, isVerified: 0, password: 0 }
      );
      return res.status(202).json(user);
    }
  } catch (err) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

// 4) delete user
const deleteUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const payload = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    await userModel.findByIdAndDelete(payload.userId);

    updateTokens(tokens => {
      tokens.push(authorization);
      return tokens;
    });

    return res.status(200).json('User has been deleted');
  } catch (err) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

// 5) soft delete
const softDelete = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const payload = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    await userModel.findByIdAndUpdate(payload.userId, {
      isDeleted: true,
    });

    updateTokens(tokens => {
      tokens.push(authorization);
      return tokens;
    });

    return res.status(200).json('User has been deleted');
  } catch (err) {}
};

// 6) logout
const logout = async (req, res) => {
  try {
    const { authorization } = req.headers;

    updateTokens(tokens => {
      tokens.push(authorization);
      return tokens;
    });

    return res.status(202).json('You have been logged out');
  } catch (err) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

export default {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  softDelete,
  logout,
};
