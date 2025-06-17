const Todo = require("../models/todoModel");
const catchAsync = require("./../utils/catchAsync");

exports.renderTodo = catchAsync(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id }).sort({
    status: -1,
    createdAt: -1,
  });
  res.render("todo", { todos });
});

exports.addNewTodo = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(500)
      .render("error", { error: "You have to be logged in to create a todo" });
  }
  await Todo.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    status: "success",
    message: "Todo Added",
  });
});

exports.completeTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, { status: req.body.status }, { new: true });
  res.status(200).json({
    status: "success",
    message: "Todo completed",
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    message: "null",
  });
});
