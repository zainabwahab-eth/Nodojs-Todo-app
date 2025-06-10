const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

const checkLogin = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/todo");
  }
  next();
};

router
  .route("/signup")
  .get(checkLogin, userController.renderSignUp)
  .post(userController.addNewUser);

router
  .route("/login")
  .get(checkLogin, userController.renderLogin)
  .post(userController.authUser);

router.route("/logout").get(userController.logout);

module.exports = router;
