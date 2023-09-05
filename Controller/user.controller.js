import userModel from "../Model/user.model.js";

const getAllUsers = async (_, res) => {
  res.status(200).json(await userModel.find());
};

// const addUser = async (req, res) => {
//   const { email } = req.body;
//   const isExist = await userModel.findOne({ email: email });
//   if (isExist) {
//     res.statusMassege = "Bad Request";
//     res.status(400).json({ message: "This user already exists" });
//   } else {
//     userModel.insertMany([req.body]);
//     res.status(200).json(req.body);
//   }
// };

const signup = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user already exists" });
  } else {
    await userModel.insertMany([req.body]);
    res.status(200).json(req.body);
  }
};

const signin = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  console.log("wowo");
  const isExist = await userModel.findOne({ email: email });
  console.log(isExist === null);
  if (isExist) {
    res.status(200).json(`Welcome ${isExist.name}`);
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user not exists" });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    await userModel.updateOne({ email: email }, { $set: { ...req.body } });
    res.status(200).json(req.body);
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user not exists" });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    await userModel.deleteOne({ email: email });
    res.status(200).json("User Deleted");
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user not exists" });
  }
};

const getProfile = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isExist = await userModel.findOne({ email: email });
  if (isExist) {
    const rusult = await userModel.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "email",
          foreignField: "userId",
          as: "posts",
        },
      },
    ]);
    res.status(200).json(rusult);
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user does not exist" });
  }
};

export default {
  getAllUsers,
  signup,
  signin,
  updateUser,
  deleteUser,
  getProfile,
};
