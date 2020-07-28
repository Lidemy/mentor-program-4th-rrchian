const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    const data = JSON.parse(body);
    data.forEach((books) => {
      console.log(books.id, books.name);
    });
  },
);
