const request = require('request');
const process = require('process');

const index = process.argv[3];

if (process.argv[2] === 'list') {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
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
}

if (process.argv[2] === 'read') {
  request(
    `https://lidemy-book-store.herokuapp.com/books/${index}`,
    (error, response, body) => {
      if (error) {
        console.log('獲取失敗', error);
      }
      const data = JSON.parse(body);
      console.log(data.id, data.name);
    },
  );
}

if (process.argv[2] === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${index}`,
    (error) => {
      if (error) {
        console.log('刪除失敗', error);
      }
      console.log('刪除成功');
    },
  );
}

if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: index,
      },
    },
  );
  console.log('新增成功！');
}

if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${index}`,
      form: {
        name: process.argv[4],
      },
    },
  );
  console.log('更新成功！');
}
