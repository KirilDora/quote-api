const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));

quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);

quotesRouter.get('/random', (req, res) => {
  const quote = getRandomElement(quotes);
  if(quote) {
    res.send(quote);
  } else {
    res.status(404).send();
  }
});

quotesRouter.get('/', (req, res) => {
  const {person} = req.query;
  if(person) {
    const byPerson = quotes.filter((quote) => quote.person === person );
    if(byPerson) {
      res.send({quotes: byPerson});
    } else {
      res.send([]);
    }
  } else { 
    res.send(quotes);
  }
});

quotesRouter.post('/', (req, res) => {
  const {quote, person} = req.query;
  if(quote && person) {
    quotes.push({quote, person});
    res.send(quotes[quotes.length-1]);
  } else {
    res.status(400);
  }
});
