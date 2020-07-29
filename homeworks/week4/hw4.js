const request = require('request');

const CLIENT_ID = 'ztm6d7m12b8h79dtzz3u0nm8ypajv1';

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);
    info.top.forEach((games) => {
      console.log(games.viewers, games.game.name);
    });
  }
}

request(options, callback);
