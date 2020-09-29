## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

>先講結論，盡量使用 `VARCHAR`，因為這是一個可以變化長度的型態。

`VARCHAR`：

1. 可變化長度，範圍介於 1 至 65535
2. 可部分使用 `index`（當 `VARCHAR` 過長時只能索引前幾個字元，不過若是已知、且不過長的長度，如電話號碼，則可以使用）

`TEXT`：

1. 固定的最大長度，為 65535
2. 無法使用 `index`

兩者的儲存空間都取決於儲存的字串長度，而非預設的最大值。

[參考資源](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

格林童話裡面有一篇糖果屋，主角兄妹被其繼母以「太窮」為理由，遺棄在森林裡，於是哥哥留下了麵包屑作為線索，找到回家的路（不過原本故事其實麵包屑是被吃掉的XD，但為了撰寫方便，就修改了故事。）

網頁上的 Cookie 也是類似的意思，提供一個線索讓瀏覽器能夠辨認使用者是誰。

在 HTTP 中，主要是透過 request 及 response 溝通。由於 HTTP request 是無狀態的協定，意即伺服器不會保存這個 request 與上個，或是說任何其他的 request 的資料，為了解決這個問題，我們可以在發送 request 時，於 Header 設置 Cookie，瀏覽器會將 Cookie 上的資訊透過 request 傳到 Server，我們再藉由 response header 讀取 Cookie 的資訊。另外，要注意 Cookie 的讀取只限於同個 domain，畢竟不同 domain 若可以存取 Cookie，則有安全性的問題。

```
設置 Cookie

$name = "cookie";
$value = "100";
$expiration = time() + /*自己設定時間*/;
setcookie($name, $value, $expiration);

```

```
存取 Cookie

if(isset($_COOKIE['cookie']) {
    $cookie = $_COOKIE['cookie']; 
    echo $cookie;
}
```

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 密碼不可存明碼
若是在資料庫存取明碼，透過 GET, POST 等方式可以輕鬆地得到輸入的值，應透過加密，比如說一把 key 對應到一個 value 的方式存到資料庫。

3. 發布留言時，沒有擋掉跳脫字元

`<h2>自行竄改格式</h2>`

就如這行程式碼所示，使用者在發布留言時，可以自行添加 HTML 的語法改變留言格式，其他的輸入亦同。只是改變格式倒還好，最怕的就是會讓整個網頁出現大 bug 的惡意輸入。