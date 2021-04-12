const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

if (process.env.ENV === 'Test') {
  //Test Env
  const db = mongoose.connect('mongodb://localhost/bookAPI-Test');
}
else {
  //Prod Env
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api', bookRouter);

app.get('/', (request, response) => {
  response.send('Welcome to my Nodemon API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
