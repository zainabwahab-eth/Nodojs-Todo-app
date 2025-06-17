const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

const ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

router.route("/").get(ensureAuth, todoController.renderTodo);
router.route("/add").post(todoController.addNewTodo);
router.route("/delete/:id").delete(todoController.deleteTodo);
router.route("/:id").patch(todoController.completeTodo);

module.exports = router;
