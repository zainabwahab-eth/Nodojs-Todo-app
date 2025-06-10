const Todo = require("../models/todoModel");

exports.renderTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      status: -1,
      createdAt: -1,
    });
    res.render("todo", { todos, activeTab: "all" });
  } catch (err) {
    console.error("Error rendering this todo");
    res.status(500).json({ message: "Err" });
  }
};

exports.addNewTodo = async (req, res) => {
  try {
    await Todo.create({ ...req.body, user: req.user._id });
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to create a todo." });
    }
    res.status(201).json({ message: "Todo Added" });
  } catch (err) {
    console.error("Error creating todo", err);
    res.status(500).json({ message: "Err" });
  }
};

exports.completeTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.status(201).json({ message: "Todo completed" });
  } catch (err) {
    console.error("Error completing todo", err);
    res.status(500).json({ message: "Err" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(204).json({ message: "null" });
  } catch (err) {
    console.error("Error deleting todo", err);
    res.status(500).json({ message: "Err" });
  }
};
