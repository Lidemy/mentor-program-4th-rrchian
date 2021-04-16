/* eslint-disable */

const gameListName = document.querySelector(".gameLists");
const liveStreamPic = document.querySelector(".streamImage");
const API_URL = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'ztm6d7m12b8h79dtzz3u0nm8ypajv1';
const STREAM_TEMPLATE = `
  <div class="stream">
  <div class="streamImage"><img src="$preview"></div>
  <div class="streamInfo">
      <div class="streamrAvatar"><img src="$logo"></div>
      <div class="streamInfoRight">
          <p class="streamTitle">$title</p>
          <p class="streamrName">$name</p>
      </div>
  </div>
  </div>
`

getGames(topGames => {
  // put top games names into .gameLists
  for (let topGame of topGames) {
    let gameListNameli = document.createElement("li");
    gameListNameli.innerHTML = topGame.game.name;
    gameListName.appendChild(gameListNameli);
  }
  // change h2 name to first top game name
  changeGame(topGames[0].game.name)
});

document.querySelector("body").addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    const gameName = e.target.innerText;
    changeGame(gameName);
  }
});

function changeGame(gameName) {
    document.querySelector("h2").innerText = gameName;
    document.querySelector(".streamsWrapper").innerHTML = "";
    getStreams(gameName, function(liveStreams){
      for (let liveStream of liveStreams) {
        appendStream(liveStream)
      }
    });
}

function appendStream(liveStream){
  let element = document.createElement("div");
  document.querySelector(".streamsWrapper").appendChild(element);
  element.outerHTML = STREAM_TEMPLATE
    .replace('$preview', liveStream.preview.large)
    .replace('$logo', liveStream.channel.logo)
    .replace('$title', liveStream.channel.status)
    .replace('$name', liveStream.channel.name);
}

function getGames(callback){
  // get top 5 games name
  return fetch(`${API_URL}/games/top?limit=5`, {
    headers: {
      "Client-ID": CLIENT_ID,
      "Accept": "application/vnd.twitchtv.v5+json",
    },
  }).then((res) => {
    return res.json();
  }).then((Games) => {
    return callback(Games.top);
  }).catch((err) => {
    console.log("error: ", err);
  })
}

function getStreams(gameName, callback){
  return fetch(`${API_URL}/streams?game=${encodeURIComponent(gameName)}`, {
    headers: {
      "Client-ID": CLIENT_ID,
      "Accept": "application/vnd.twitchtv.v5+json",
    },
  }).then((res) => {
    return res.json();
  }).then((Games) => {
    return callback(Games.streams);
  }).catch((err) => {
    console.log("error: ", err);
  })
}
