module.exports = (err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .render("error", {
      error:
        "There was an error. If issue persists, please contact the developer",
    });
};
