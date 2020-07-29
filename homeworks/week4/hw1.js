const request = require('request');
// 範例中多了 const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'; 應該是為了增加可讀性？

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      console.log('獲取失敗', error);
    }
    const data = JSON.parse(body);
    data.forEach((books) => {
      console.log(books.id, books.name);
    });
  },
);
