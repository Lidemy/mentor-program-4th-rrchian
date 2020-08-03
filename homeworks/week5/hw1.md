## 前四週心得與解題心得

大概從 JS 的部分開始，就與課程規劃的進度脫鉤，雖然 Huli 跟助教常常在群裡提到，進度是自己的規劃，而不是因為趕不上進度就打亂自己的學習節奏，但進度的規劃也有它的道理，比如說這週的內容就是希望能夠在「一週內」完成，給予時限才能有效率，安排每件事情的優先順序，在前幾週的時候做不太到，因為看一些作業優良的同學，都會很想寫出那樣的程式碼，所以分頁一直開，有看不完的補充資料，但這樣下來其實很多補充資料的內容也看不懂，基本的課程內容也都沒有到非常熟悉。有點本末倒置。

所以從複習週開始，就先把沒有完成的事情，挑戰題呀、同學補充的資源等等放到 notion 裡，等到以後有追上進度再來看，儘管這是複習週，但因為以前學習都有記筆記、看自我檢測的習慣，所以簡略複習的方式就是看課綱上的檢測，問自己是不是能夠回答出問題，如果有概念我就先當作會，等到下一個複習週再來深層複習，現在還是希望能先追上進度，因為這週其實是第八週了⋯⋯作業的進度還缺很多，一切加油！

## HTTP Challenge

###### lv1

[GET 與 POST 差異](https://www.wibibi.com/info.php?tid=235)
> 用 GET 方法傳遞資料會透過附加在 URL 的方式

在思考這題時有個盲點，因為 Method 叫做 GET，所以一直在想這個方法不是只能「獲取」資料嗎？為什麼可以「傳送」資料？

原本有想藉由 request 這個 library 寫出程式檔，再經由 node.js 傳遞資料，但一直沒有寫成功。

寫法大致是這樣，但都沒有成功把 name 傳送出去。
```
const request = require('request');

const options = {
  url: 'https://lidemy-http-challenge.herokuapp.com/lv1?token={GOGOGO}',
  headers: {
    'name': 'rex',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
  }
}

request(options, callback);
```

###### lv2

這一題有點太直覺得解出來⋯⋯不知道這樣的方式到底是不是正確的，因為它說要用 GET 傳送書的 id，所以就在網址後方直接加上 `&id=` 從 55 開始試，然後試到 56  就成功了。

原本想寫這樣的程式碼，從 /books 裡得到所有書的資訊，然後從 55-57 每一本書都傳送一次看哪一個是正確的。

```
const request = require('request');

request.get({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
        /*
        form: {
            email: 'jason@gg',
            password: '9487'
        }
        */
    },
    function (err, response, body) {
        const info = JSON.parse(body)
        console.log('body:', info); 
    });
```

但有幾點不太清楚的是，照目前的寫法是從 /books 讀取資料，但第二關的 URL 是 `https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}` 那要怎麼從 /books 拿到資料然後再用 GET 到第二關的網址呢？還是其實直接 request 第二關的網址然後 + &id='55-57' 這樣子就好？

###### lv3

```
request.post({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
        form: {
            name: '大腦喜歡這樣學',
            ISBN: '9789863594475',
        }
    },
    function (err, response, body) {
        const info = JSON.parse(body)
        console.log('body:', info); 
    });
```

這題有點慚愧，在 API 文件有提到 `POST 以及 PATCH 的 content type 為：application/x-www-form-urlencoded。
` 這一句話，我還沒搞懂是什麼意思，就用以前學會的方法 POST 資料上去，也確實成功。

###### lv4

```
request.get({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
    },
    function (err, response, body) {
        const info = JSON.parse(body)
        info.forEach((books) => {
        if(books.author === '村上春樹' && books.name.indexOf('世界') >= 0)
          console.log(books.id, books.name, books.author);
        });
    });
```

一開始很作弊的直接找作者是村上春樹的，就找到答案，但這樣子其實是透過人腦去解析才得到答案，而不是程式本身就是解方。所以藉由 `books.name.indexOf('世界') >= 0` 去判斷書名裡有沒有包含「世界」這兩個字。

題外話，一開始程式寫成 `books.name.indexOf('世界') > 0` 應該就是代表有這個子字串的意思，但卻不對，藉由 console.log 出這個表達式的值才發現，因為就剛剛好世界是這本書的開頭，所以 index 是 0 XDD 

###### lv5

```
request.delete({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/books'+'/23',
    },
    function (err, response, body) {
        if(err){
            console.log(err)
            return
        }
        const info = JSON.parse(body)
        console.log(info);
    });
```

但得到的 message 是 `咦...是刪掉了沒錯，但總覺得哪裡怪怪的，算了，先這樣吧！` 感覺是有什麼 case 沒想到⋯⋯

（XDD，結果下一關就知道為什麼了。）

###### lv6

這一題參考胡立老師提的 `http basic authorization` 直接找資料。但有卡一下下的地方是 `'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='` 這一行，因為原本忘記加 `' '` ，但看了 js request 的 library 說明都有加上，所以加上後就成功了。

```
request({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/me',
        headers: {
        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='
        }
    },
    function (err, response, body) {
        if(err){
            console.log(err)
            return
        }
        console.log(body);
    });

```

###### lv7

這一題跟 lv5 基本上差不多，只是多了 Authorization 的部分。

###### lv8

先參考 lv4 查詢書本的方法寫出

```
request.get({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books',
        headers: {
        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='
        }
    },
    function (err, response, body) {
        const info = JSON.parse(body)
        info.forEach((books) => {
        if(books.author.length === 4 && books.name.indexOf('我') >= 0 && books.ISBN.charAt(9) === '7')
          console.log(books.id, books.name, books.author, books.ISBN);
        });
    });
```

原本寫 `books.ISBN.charAt(9) === 7` 沒有符合條件式找不到書本，藉由 console.log 與 typeof() 檢查型態後，發現應該是 `===` 會同時檢測型態，但是 books.ISBN 是字串的形式，如果用 `== 7` 會找得到書本，但如果要用 `===` 則要寫成 `=== 7` 的形式，因為在這邊的 7 不是數字而是字串。 

> 原本想嘗試能不能寫好一支程式碼，直接找出該本書及修改資料一次完成，而不是先用 get 得到書的資訊，因為知道指定書目的 id 是 72 再去把這些值輸入 patch 的函式，但都沒有成功，只好分批次完成

```
request.patch({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/72',
        headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='
        },
        form: {
            ISBN: '9981835423',
        }
    },
    function (err, response, body) {
        console.log(body);
});
```
**不是很清楚 headers 與 form 的差異**

###### lv9

```
request.get({
        url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info',
        headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4xMjM=',
            'X-Library-Number': '20',
            'user-agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
        }
    },
    function (err, response, body) {
        console.log(body)
});
```

一開始看到說明有點不知道該怎麼辦，但想到存取條件概念上應該就像鑰匙，所以就放在 headers 觀察看看。唯一比較麻煩的是查詢 IE6 的 user agent 字串這部分，因為很多網站都推薦可以到 [這裡](useragentstring.com) 查詢，可是我連線好幾次都沒有成功，所幸後來仍然有找到 IE6 的 user-agent-string。

###### lv10

XDD，這題好跳 tone，因為以前就會跟弟弟玩這個遊戲，所以滿快就找出答案了。

###### lv11

這題感覺跟 lv9 很像，所以一開始寫成 `'user-agent': 'lidemy.com',`，後來參考提示修改成 `'origin': 'lidemy.com',` 就成功了。

###### lv12

> 我已經把運送要用的 token 給你囉，請你仔細找找

！！！（哪尼！！！！）感覺是尋寶遊戲的開端。

解⋯⋯解不出來⋯⋯先趕下週進度，以後再回來解題！

