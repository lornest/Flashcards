const express = require('express');
const router = express.Router();
const Card = require('../models/card.js');
const cards  = Card.get();

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const randomId = Math.floor( Math.random() * numberOfCards );
  res.redirect(`/cards/${randomId}`)
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if ( !side ) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.flipTo = 'answer';
    templateData.flipToDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.flipTo = 'question';
    templateData.flipToDisplay = 'Question';
  }

  res.render("card", templateData);
});

module.exports = router;
