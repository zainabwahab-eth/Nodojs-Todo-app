const User = require("../models/userModel");
const passport = require("passport");

exports.renderSignUp = (req, res) => {
  res.render("signup");
};

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.addNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User Already Exist");
      res.redirect("/signup");
    }
    if (!name || !email || !passport) {
      req.flash("error", "Please Enter all fields");
      res.redirect("/signup");
    }
    await User.create({ name, email, password });
    res.redirect("/login");
  } catch (err) {
    req.flash("error", "An error occured");
    res.redirect("/signup");
  }
};

exports.authUser = passport.authenticate("local", {
  successRedirect: "/todo",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
};
