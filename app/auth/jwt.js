const jwt = require("jsonwebtoken");
const JWT_SECRET = "coucou";
const user = require("../models/user");

const extractBearerToken = headerValue => {
  if (typeof headerValue == !"string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

exports.checkToken = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  if (!token) {
    return res
      .status("403")
      .json("Vous n'avez pas les droits pour consulter cette page");
  }
  jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) return res.status("403").json({ error: "Token non valide" });
    user
      .getUserById(decode.id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.json(err));
  });
};

exports.isAdmin = (req, res, next) => {
  req.user.role == "admin"
    ? next()
    : res
        .status(401)
        .json({ error: "Vous n'avez pas les doits pour consulter cette page" });
};
