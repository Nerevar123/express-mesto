const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ERROR_CODE_404, errorMessage404 } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5fafed8d29676e85f222222f',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(ERROR_CODE_404).send({ message: errorMessage404 });
});

app.listen(PORT);
