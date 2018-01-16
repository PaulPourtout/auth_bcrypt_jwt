const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();
const { encode, compare } = require("../auth/pwd");

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
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user
    .getUserByEmail({ email })
    .then(user => {
      if (!user)
        // Email doesn't exist in DB
        return res.status("401").json({ error: "Utilisateur introuvable" });

      return compare(password, user.password).then(
        bool =>
          bool
            ? res.send("Utilisateur connecté")
            : res.status("401").json({ error: "Mauvais mot de passe" }) // Password doesn't match password in DB
      );
    })
    .catch(err => res.json(err));
});

module.exports = router;
