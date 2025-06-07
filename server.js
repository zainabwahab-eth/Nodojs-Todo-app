const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const DB = process.env.DB_URL;

mongoose.connect(DB).then(() => {
  console.log("connection to mongodb successful");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`You're listening to ${PORT}`);
});
