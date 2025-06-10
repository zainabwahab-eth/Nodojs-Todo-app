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
      return res.send("User already exists");
    }
    await User.create({ name, email, password });
    console.log(req.body);
    res.redirect("/login");
  } catch (err) {
    alert("Error signing user");
    res.status(500).send("Signup error");
  }
};

exports.authUser = passport.authenticate("local", {
  successRedirect: "/todo",
  failureRedirect: "/login",
});

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
};
