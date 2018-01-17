// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  req.user.role == "admin"
    ? next()
    : res
        .status(401)
        .json({ error: "Vous n'avez pas les doits pour consulter cette page" });
};
