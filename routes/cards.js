const getCards = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');

fsPromises.readFile(cardsPath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .then((cards) => {
    getCards.get('/', (req, res) => {
      res.send(cards);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = getCards;
