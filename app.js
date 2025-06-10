const express = require("express");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");
const authUser = require("./middleware/authUser");
const User = require("./models/userModel");
const dotenv = require("dotenv");

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use("/todo", todoRoute);
app.use("/", userRoute);

app.use((req, res, next) => {
  console.log("Hello from the server");
  next();
  todoRoute;
});

module.exports = app;
