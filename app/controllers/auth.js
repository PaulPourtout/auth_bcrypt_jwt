const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();
const { encode, compare } = require("../auth/pwd");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "coucou";

router.post("/register", (req, res) => {
  const { lastname, firstname, email, password } = req.body;
  const role = "user";
  user
    .notExist(email)
    .then(bool => encode(password))
    .then(hash => {
      user.createUser({
        firstname,
        lastname,
        email,
        password: hash,
        role
      });
    })
    .catch(err => res.json({ error: err }));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user
    .getUserByEmail({ email })
    .then(user => {
      if (!user)
        return res.status("401").json({ error: "Utilisateur introuvable" });

      return compare(password, user.password).then(isPasswordOk => {
        if (isPasswordOk) {
          const { id, firstname, lastname, email, role } = user;
          const token = jwt.sign(
            { id, firstname, lastname, email, role },
            JWT_SECRET,
            {
              expiresIn: 60 * 60 * 3
            }
          );
          return res.json({ token, user: { id, firstname, lastname } });
        } else {
          // Password doesn't match password in DB
          return res.status("401").json({ error: "Mauvais mot de passe" });
        }
      });
    })
    .catch(err => res.json(err));
});

module.exports = router;
