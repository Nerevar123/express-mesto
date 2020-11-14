const User = require('../models/user');
const {
  ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500, errorMessage400, errorMessage404, errorMessage500,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: errorMessage500 }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: errorMessage404 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: errorMessage400 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: errorMessage400 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: errorMessage400 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};
