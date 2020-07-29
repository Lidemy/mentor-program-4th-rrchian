const request = require('request');

const keyword = process.argv[2];

request(
  `https://restcountries.eu/rest/v2/name/${keyword}`,
  (error, response, body) => {
    if (error) {
      console.log('獲取失敗', error);
    }
    if (response.statusCode === 404) {
      console.log('找不到國家資訊');
      return;
    }
    const data = JSON.parse(body);
    data.forEach((country) => {
      const currency = country.currencies.map(c => Object.values(c)[0]).toString();
      console.log('============');
      console.log(`國家：${country.name}`);
      console.log(`首都：${country.capital}`);
      console.log(`貨幣：${currency}`);
      console.log(`國碼：${parseInt(country.callingCodes, 10)}`);
    });
  },
);
