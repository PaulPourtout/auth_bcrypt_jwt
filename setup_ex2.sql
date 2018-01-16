DROP TABLE IF EXISTS users_cards_lists;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS lists;

CREATE TABLE lists
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

INSERT INTO lists
  (name)
VALUES
  ('Backlogs'),
  ('A faire'),
  ('En cours'),
  ('Fait');

CREATE TABLE cards
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

INSERT INTO cards
  (name)
VALUES
  ('Connecter l''appli à la BDD'),
  ('Faire une requête SQL'),
  ('Faire une relation one to many'),
  ('Faire une relation many to many'),
  ('Faire une appli NodeJS'),
  ('Créer des routes d''API'),
  ('Créer la web pour interroger l''API');

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  lastname varchar(255),
  firstname varchar(255),
  email varchar(255),
  password varchar(255),
  role varchar(255)
);

INSERT INTO users
  (firstname, lastname, email, password, role)
VALUES
  ('David', 'Ostermann', 'do@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'admin'),
  ('Faustino', 'Kialungila', 'fk@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'admin'),
  ('Paljor', 'Tsang', 'pt@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user'),
  ('Gaelle', 'Meric', 'gm@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user'),
  ('Joffrey', 'Gitau', 'jg@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user'),
  ('Mehdi', 'Druon', 'md@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user'),
  ('Martin', 'Eon', 'me@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user'),
  ('Julien', 'Grach', 'jgr@mail.com', '$2a$10$9jbwh3LEloel5xF0hq7syemjBOiLQmkWbTLxpIlcHUo4kIvY8qBr2', 'user');

CREATE TABLE users_cards_lists
(
  user_id integer REFERENCES users ON DELETE CASCADE,
  card_id integer REFERENCES cards ON DELETE CASCADE,
  list_id integer REFERENCES lists ON DELETE SET NULL,
  PRIMARY KEY (user_id, card_id)
);

INSERT INTO users_cards_lists
  (user_id, card_id, list_id)
VALUES
  (1, 3, 1),
  (1, 1, 1),
  (1, 7, 1),
  (2, 1, 1),
  (3, 4, 1),
  (3, 5, 1),
  (5, 2, 1),
  (5, 3, 1),
  (6, 6, 1),
  (6, 4, 1),
  (7, 7, 1),
  (8, 2, 1),
  (8, 3, 1),
  (8, 6, 1);