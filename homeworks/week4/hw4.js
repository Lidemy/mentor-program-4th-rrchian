/*
my CLIENT_ID = ztm6d7m12b8h79dtzz3u0nm8ypajv1

Request header (Client-ID: XXXXX)
Query-string parameter
(https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX)
*/

const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'ztm6d7m12b8h79dtzz3u0nm8ypajv1',
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
