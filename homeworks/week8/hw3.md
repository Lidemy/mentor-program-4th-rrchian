## 什麼是 Ajax？

Ajax 全名為 Asynchronous JavaScript and XML，意思為非同步 JavaScript 以及 XML，利用 Ajax，我們可以在瀏覽器上，即時更動部分介面與內容，而不需要將整個網頁重新讀取。

同步，指程式會照著你寫的程式碼一行一行的執行，因此若是網頁中的某一區塊需要發 request 給某個 server 串 API的話，則整個網頁的程式會等到得到 response 後才開始執行。因此非同步則是頁面的其他部分會繼續執行，而發 request 的區塊則是會設置 callback function，當得到 response 後才會執行。

使用 Ajax 時，有幾個特別重要的部分，分別是 XMLHttpRequest、JavaScript DOM、HTTP request。

XMLHttpRequest、JavaScript 是 JS 提供的一個 API，負責發送 request 與接受 response。

JavaScript DOM 則是運用 HTML 上的 DOM 元素進行操作。

最後則是透過 HTTP 對 server 發出 request，再從 server 接收 response。這之中都是透過瀏覽器來運作。

[參考資料](https://ithelp.ithome.com.tw/articles/10200409)

## 用 Ajax 與我們用表單送出資料的差別在哪？

用表單送出資料時，背後其實是透過瀏覽器傳送一個 request 給 server，同時將資料傳送過去，而 server 會接受傳來的表單，並回傳一個新的網頁，也就是說用表單送資料時，整個頁面會重新整理過。

Ajax 則是透過 JS 向 server 發送 request 及接收 response，因此在 server 與瀏覽器之間換取的資料少很多換取的資料少很多，同時回傳的 response 也只與 JS 做溝通，不會導致整個頁面的更新。 

## JSONP 是什麼？

由於 Ajax 因為是藉由瀏覽器的 JS 請求資料，因此會因為瀏覽器的安全性限制，而無法跨網域存取資料，JSONP 是用來解決跨網域存取資料的一種方式。

JSONP 全名是 JSON with Padding，使用 JSON 是因為其是純文字格式，交換資料方便，且原生 JS 即可使用 JSON。

JSON 解決跨網域限制的方式之一，就是透過 `<script>` 標籤指定 src 屬性就可以跨網域請求資料，其他類似的方式還有透過 `<img>`, `<iframe>` 等。

[參考資料](https://www.fooish.com/json/jsonp.html)

## 要如何存取跨網域的 API？

存取跨網域 API 的方式，就是利用 JS 動態存取及使用。

當使用 JS `<script>` 中的 `src` 指向一個跨網域的 Endpoint（類似於發送 request），server 接受到 request 後會返回一支 JS 檔案，在檔案中會有一個 callback function，而函式中的參數通常會是 JSON 格式的資料，這樣我們就得到資料可以使用了！

（實際操作過 JSONP，但對整體概念還不是很熟悉 Q^Q）

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為我們第四週串 API 時，使用的 runtime 是本機上的 node.js，用 node.js 發 request 給 server，再從 server 得到 response，而這週卻是透過瀏覽器發 request 及拿到 response，因為是藉由瀏覽器當中間的媒介，所以會有許多限制。