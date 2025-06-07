const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router
  .route("/")
  .get(todoController.renderTodo)
  .post(todoController.addNewTodo);

router
  .route("/:id")
  .delete(todoController.deleteTodo)
  .patch(todoController.completeTodo);

module.exports = router;
