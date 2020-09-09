/*
重構程式碼：
1. 相同的功能可以用函式包裝起來
2. 每重組一次程式碼就看功能有沒有失效
3. 固定用到的網址、模版等，都可以直接宣告一個變數，後續修改比較方便
*/

/* eslint-disable */

const gameListName = document.querySelector(".gameLists");
const liveStreamPic = document.querySelector(".streamImage");

// get top 5 games name
let requestTopGames = new XMLHttpRequest();
requestTopGames.open("GET", "https://api.twitch.tv/kraken/games/top?limit=5");
requestTopGames.setRequestHeader(
  "Content-Type",
  "application/x-www-form-urlencoded"
);
requestTopGames.setRequestHeader("Client-ID", "ztm6d7m12b8h79dtzz3u0nm8ypajv1");
requestTopGames.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
requestTopGames.onload = function() {
  if ((requestTopGames.status >= 200) & (requestTopGames.status < 400)) {
    const topGames = JSON.parse(requestTopGames.responseText).top;
    // put top games names into .gameLists
    for (let topGame of topGames) {
      let gameListNameli = document.createElement("li");
      gameListNameli.innerHTML = topGame.game.name;
      gameListName.appendChild(gameListNameli);
    }

    // change h2 name to first top game name
    document.querySelector("h2").innerText = topGames[0].game.name;

    // get game live stream
    const requestLiveStream = new XMLHttpRequest();
    requestLiveStream.open(
      "GET",
      "https://api.twitch.tv/kraken/streams?game=" +
        encodeURIComponent(topGames[0].game.name) +
        "&limit=20"
    );
    requestLiveStream.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    requestLiveStream.setRequestHeader(
      "Client-ID",
      "ztm6d7m12b8h79dtzz3u0nm8ypajv1"
    );
    requestLiveStream.setRequestHeader(
      "Accept",
      "application/vnd.twitchtv.v5+json"
    );
    requestLiveStream.onload = function() {
      if (
        (requestLiveStream.status >= 200) &
        (requestLiveStream.status < 400)
      ) {
        const liveStreams = JSON.parse(requestLiveStream.responseText).streams;
        for (let liveStream of liveStreams) {
          let element = document.createElement("div");
          document.querySelector(".streamsWrapper").appendChild(element);
          element.outerHTML = `
            <div class="stream">
            <div class="streamImage"><img src="${liveStream.preview.large}"></div>
            <div class="streamInfo">
                <div class="streamrAvatar"><img src="${liveStream.channel.logo}"></div>
                <div class="streamInfoRight">
                    <p class="streamTitle">${liveStream.channel.status}</p>
                    <p class="streamrName">${liveStream.channel.name}</p>
                </div>
            </div>
        </div>`;
        }
      } else {
        console.log(requestLiveStream.state, requestLiveStream.responseText);
      }
    };
    requestLiveStream.onerror = function() {
      console.log("error");
    };
    requestLiveStream.send();
  } else {
    console.log(requestTopGames.state, requestTopGames.responseText);
  }
};
requestTopGames.onerror = function() {
  console.log("error");
};
requestTopGames.send();

document.querySelector("body").addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    const gameName = e.target.innerText;
    document.querySelector("h2").innerText = gameName;
    document.querySelector(".streamsWrapper").innerHTML = "";
    const requestLiveStream = new XMLHttpRequest();
    requestLiveStream.open(
      "GET",
      "https://api.twitch.tv/kraken/streams?game=" + gameName + "&limit=21"
    );
    requestLiveStream.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    requestLiveStream.setRequestHeader(
      "Client-ID",
      "ztm6d7m12b8h79dtzz3u0nm8ypajv1"
    );
    requestLiveStream.setRequestHeader(
      "Accept",
      "application/vnd.twitchtv.v5+json"
    );
    requestLiveStream.onload = function() {
      if (
        (requestLiveStream.status >= 200) &
        (requestLiveStream.status < 400)
      ) {
        const liveStreams = JSON.parse(requestLiveStream.responseText).streams;
        for (let liveStream of liveStreams) {
          let element = document.createElement("div");
          document.querySelector(".streamsWrapper").appendChild(element);
          element.outerHTML = `
            <div class="stream">
            <div class="streamImage"><img src="${liveStream.preview.large}"></div>
            <div class="streamInfo">
                <div class="streamrAvatar"><img src="${liveStream.channel.logo}"></div>
                <div class="streamInfoRight">
                    <p class="streamTitle">${liveStream.channel.status}</p>
                    <p class="streamrName">${liveStream.channel.name}</p>
                </div>
            </div>
        </div>`;
        }
      } else {
        console.log(requestLiveStream.state, requestLiveStream.responseText);
      }
    };
    requestLiveStream.onerror = function() {
      console.log("error");
    };
    requestLiveStream.send();
  }
});
