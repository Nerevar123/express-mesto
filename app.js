const express = require('express');
const path = require('path');
const getUsers = require('./routes/users.js');
const getCards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', getUsers);
app.use('/cards', getCards);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
