const getUsers = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

fsPromises.readFile(usersPath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .then((users) => {
    getUsers.get('/', (req, res) => {
      res.send(users);
    });
    return users;
  })
  .then((users) => {
    getUsers.get('/:id', (req, res) => {
      const user = users.find((u) => u._id === req.params.id);

      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(user);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = getUsers;
