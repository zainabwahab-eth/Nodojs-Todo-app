const express = require("express");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const flash = require("connect-flash");

const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
const authUser = require("./middleware/authUser");
const User = require("./models/userModel");
const errorHandling = require("./controllers/errorController");

dotenv.config({ path: "./config.env" });

const app = express();

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    authUser
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use((req, res, next) => {
  res.locals.error = req.flash("error") || [];
  next();
});

app.use("/todo", todoRoute);
app.use("/", userRoute);
app.use("/", todoRoute);

app.all(/.*/, (req, res, next) => {
  res.status(404).render("notfound");
});

app.use(errorHandling);

module.exports = app;
