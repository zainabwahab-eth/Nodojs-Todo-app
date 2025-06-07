const express = require("express");
const todoRoute = require("./routes/todoRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.set("view engine", "ejs");

app.set("views", `${__dirname}/views`);

app.use("/todo", todoRoute);

app.use((req, res, next) => {
  console.log("Hello from the server");
  next();
  todoRoute;
});

module.exports = app;
