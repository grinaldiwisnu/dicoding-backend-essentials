const express = require('express');
const book = require('./modules/book/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', book);

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('app listened at http://localhost:5000');
});
