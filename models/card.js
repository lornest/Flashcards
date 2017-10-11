const { data } = require('../data/flashcardData.json');

exports.get = function() {
  const { cards } = data;
  return cards;
}
