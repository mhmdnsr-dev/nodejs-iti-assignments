import postModel from "../Model/post.model.js";
import userModel from "../Model/user.model.js";

const getAllPosts = async (_, res) => {
  res.status(200).json(await postModel.find());
};

// const addUser = async (req, res) => {
//   const { email } = req.body;
//   const isExist = await postModel.findOne({ email: email });
//   if (isExist) {
//     res.statusMassege = "Bad Request";
//     res.status(400).json({ message: "This user already exists" });
//   } else {
//     postModel.insertMany([req.body]);
//     res.status(200).json(req.body);
//   }
// };

const addPost = async (req, res) => {
  const { email } = req.body;
  const { postId } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isUser = await userModel.findOne({ email: email });
  const isPost = await postModel.findOne({ postId: postId });
  if (isUser && !isPost) {
    await postModel.insertMany([{ userId: req.body.email, ...req.body }]);

    res.status(200).json(req.body);
  } else if (isPost) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "id is repeated" });
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user not exists" });
  }
};

const delPost = async (req, res) => {
  const { email } = req.body;
  const { postId } = req.body;
  if (!email) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email field is require" });
    return;
  }
  const isUser = await userModel.findOne({ email: email });
  const isPost = await postModel.findOne({ postId: postId });

  if (isUser && isPost) {
    await postModel.deleteOne({ postId: postId });

    res.status(200).json("Post Deleted");
  } else if (isUser && !isPost) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This post does not exist" });
  } else {
    res.statusMassege = "Bad Request";
    res
      .status(400)
      .json({ message: "This user is not authorized to delete this post" });
  }
};

const updatePost = async (req, res) => {
  const { email } = req.body;
  const { postId } = req.body;
  if (!email || !postId) {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "The email and postId fields is require" });
    return;
  }
  const isUser = await userModel.findOne({ email: email });
  const isPost = await postModel.findOne({ postId: postId });
  if (isUser && isPost && isPost.userId === email) {
    await postModel.updateOne({ postId: postId }, { $set: { ...req.body } });
    res.status(200).json(req.body);
  } else if (isUser && isPost) {
    res.statusMassege = "Bad Request";
    res
      .status(400)
      .json({ message: "This user is not authorized to update this post" });
  } else {
    res.statusMassege = "Bad Request";
    res.status(400).json({ message: "This user or post not exists" });
  }
};



export default {
  getAllPosts,
  addPost,
  delPost,
  updatePost,
};
