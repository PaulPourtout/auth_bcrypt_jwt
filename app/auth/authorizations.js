// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  req.user.role == "admin"
    ? next()
    : res.status(401).json({ error: "Not admin" });
};

exports.isOwnAccount = (req, res, next) => {
  req.user.id == req.params.id
    ? next()
    : res.status(401).json({ error: "You're not authorized" });
};
