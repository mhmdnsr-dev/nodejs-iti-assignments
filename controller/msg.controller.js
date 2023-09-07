import jwt from 'jsonwebtoken';
import msgModel from '../model/msg.model.js';
import userModel from '../model/user.model.js';

const addMsg = async (req, res) => {
  try {
    const { token } = req.headers;
    const { to } = req.body;
    const from = jwt.verify(token, 'mykey');
    const isUserFrom = await userModel.findOne({ email: from });
    const isUserTo = await userModel.findOne({ email: to });
    if (isUserTo?.email === from) {
      res.status(400).json('Can not sent message to yourself');
      return;
    }
    if (isUserTo) {
      await msgModel.insertMany({
        ...req.body,
        to: isUserTo._id,
        from: isUserFrom._id,
      });
      res.status(201).json(req.body);
    } else {
      res.status(400).json("This usre does't exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const delMsg = async (req, res) => {
  try {
    const { id } = req.body;
    const { token } = req.headers;
    const email = jwt.verify(token, 'mykey');

    const isUser = await userModel.findOne({ email: email });

    const targetMsg = await msgModel.findOne({ id: id });

    if (targetMsg) {
      if (isUser._id === targetMsg.from) {
        await msgModel.deleteOne({ id: id });
      } else res.status(401).json('Message not found');
    } else {
      res.status(404).json('You are not authorized to delete this message');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMsgs = async (req, res) => {
  try {
    const result = await msgModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'to',
          foreignField: '_id',
          as: 'sentTo',
        },
      },

      {
        $project: {
          _id: 0,
          to: 0,
          from: 0,
          __v: 0,
          'owner.__v': 0,
          'owner._id': 0,
          'owner.password': 0,
          'sentTo.__v': 0,
          'sentTo._id': 0,
          'sentTo.password': 0,
        },
      },

      {
        $project: {
          title: 1,
          body: 1,
          id: 1,
          owner: {
            $arrayElemAt: ['$owner', 0],
          },
          sentTo: {
            $arrayElemAt: ['$sentTo', 0],
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
};

export default {
  addMsg,
  delMsg,
  getMsgs,
};
