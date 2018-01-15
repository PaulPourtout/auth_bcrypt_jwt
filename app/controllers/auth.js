const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();

router.post("/register", (req, res) => {
  const { lastname, firstname, email, password } = req.body;
  const role = "user";
  user
    .notExist(email)
    .then(bool => {
      bcrypt.hash(password, null, null, (err, hashedPassword) => {
        user
          .createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role
          })
          .then(result => res.send(result))
          .catch(err => console.log(err));
      });
    })
    .catch(err => res.json(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user
    .getUserByEmail({ email })
    .then(result => {
      result
        ? bcrypt.compare(password, result.password, (err, result) => {
            if (result) {
              res.send("Utilisateur connecté");
            } else {
              res.send("Mauvais mot de passe");
            }
          })
        : res.send("Utilisateur introuvable");
    })
    .catch(err => res.json(err));
});

module.exports = router;
