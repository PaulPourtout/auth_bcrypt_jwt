const express = require("express");
const user = require("../models/user");
const router = express.Router();
const { encode, compare } = require("../auth/pwd");
const { checkToken, createToken } = require("../auth/jwt");

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
        return res.status(401).json({ error: "Utilisateur introuvable" });

      return compare(password, user.password).then(isPasswordOk => {
        createToken(isPasswordOk);
      });
    })
    .catch(err => res.json(err));
});

module.exports = router;
