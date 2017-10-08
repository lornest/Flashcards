const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

// the express(); function creates a new express application
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')


app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    const err = new Error("I'm an error");
    err.status = 500;
    next(err);
  });

app.use((err, req, res, next) => {
  const notFound = new Error('Not Found');
  notFound.status = 404;
  next(notFound);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

// to set up a development server, call the .listen(port); function
app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
