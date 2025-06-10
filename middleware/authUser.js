const User = require("./../models/userModel");

const authUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "No User found" });
    }
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    console.log("Error during authentication:", err);
    return done(err);
  }
};

module.exports = authUser;
