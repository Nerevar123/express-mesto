const Card = require('../models/card');
const {
  ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500, errorMessage400, errorMessage404, errorMessage500,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: errorMessage500 }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: errorMessage400 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: errorMessage404 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: errorMessage404 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: errorMessage404 });
      }
      res.status(ERROR_CODE_500).send({ message: errorMessage500 });
    });
};
