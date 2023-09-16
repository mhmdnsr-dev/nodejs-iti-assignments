import taskModel from '../model/task.model.js';
import userModel from '../model/user.model.js';

const addTask = async (req, res) => {
  try {
    const { authorization } = req.headers;

    const user = await userModel.findOne({ email: req.body.assignTo });

    const payload = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    await taskModel.insertMany({
      ...req.body,
      userId: payload.userId,
      assignTo: user?._id || payload.userId,
    });

    return res.status(201).json({
      ...req.body,
      ...(user?._id || {
        warning:
          'The sent email does not represent any user and therefore the task is assigned to you',
      }),
    });
  } catch (error) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json(`the id is require`); //Most likely this will not happen

    const task = await taskModel.findByIdAndUpdate(id, { ...req.body });
    if (!task) return res.status(404).json(`Can't found this task`); //Most likely this will not happen
    res.status(202).json(task);
  } catch (error) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json(`the id is require`); //Most likely this will not happen

    const task = await taskModel.findByIdAndDelete(id);
    if (!task) return res.status(404).json(`Can't found this task`); //Most likely this will not happen
    res.status(202).json('Task has been deleted');
  } catch (error) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};
const allTasks = async (req, res) => {
  try {
    const { endDeadline } = req.body;
    let tasks;
    if (endDeadline)
      tasks = await taskModel.find({ deadline: { $lt: new Date() } });
    else tasks = await taskModel.find({});

    if (tasks.length === 0) return res.status(204).json('Not found any task');
    else return res.status(200).json(tasks);
  } catch (error) {
    console.error('Controller error', err);
    res.status(500).json(err);
  }
};

export default {
  addTask,
  updateTask,
  deleteTask,
  allTasks,
  noDeadline,
};
