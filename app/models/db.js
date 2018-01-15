const { Client } = require("pg");
const db = new Client({
  connectionString: "postgres://postgres:postgres@localhost:5432/trellolike"
});

db.connect(err => {
  if (err) {
    return console.log(err);
  }
  console.log("DB CONNECTED !!!!");
});

module.exports = db;
