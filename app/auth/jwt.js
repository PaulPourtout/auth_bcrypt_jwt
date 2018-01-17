const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const user = require("../models/user");

const extractBearerToken = headerValue => {
  if (typeof headerValue == !"string") return false;
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

// Middleware to check Token validity
exports.checkToken = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  if (!token) {
    return res
      .status(403)
      .json("Vous n'avez pas les droits pour consulter cette page");
  }
  jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) return res.status(403).json({ error: "Token non valide" });
    user
      .getUserById(decode.id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.json(err));
  });
};

// Create Token if req password ok
exports.createToken = (isPasswordOk, user) => {
  if (isPasswordOk) {
    const { id, firstname, lastname, email, role } = user;
    const token = `bearer ${jwt.sign(
      { id, firstname, lastname, email, role },
      JWT_SECRET,
      { expiresIn: 60 * 60 * 3 }
    )}`;
    return { token, user: { id, firstname, lastname } };
  } else {
    // Password doesn't match password in DB
    return res.status(401).json({ error: "Mauvais mot de passe" });
  }
};
