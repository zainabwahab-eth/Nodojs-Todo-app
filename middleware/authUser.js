const User = require("./../models/userModel");

const authUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      alert("No user found");
      return done(null, false, { message: "No User found" });
    }

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      alert("Incorrect password");
      return done(null, false, { message: "Incorrect password" });
    }
    alert("Login successful");
    return done(null, user);
  } catch (err) {
    console.log("Error during authentication:", err);
    return done(err);
  }
};

module.exports = authUser;
