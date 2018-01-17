// encode password
const bcrypt = require("bcrypt-nodejs");

/*
	@param pwd - password not hashed
*/
exports.encode = pwd => {
  if (!pwd) return Promise.reject(new Error("Password is not defined"));

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(pwd, salt, null, (err, hashedPassword) => {
        if (err) return reject(err);

        return resolve(hashedPassword);
      });
    });
  });
};

/*
	@param pwd - password not hashed
	@param hashedPwd - hashed password in DB
*/

exports.compare = (pwd, hashedPwd) => {
  if (!pwd || !hashedPwd) return Promise.reject(new Error("Bad parameters"));

  return new Promise((resolve, reject) => {
    bcrypt.compare(pwd, hashedPwd, (err, bool) => {
      if (err) return reject("oups ! error: ", err);
      resolve(bool);
    });
  });
};
