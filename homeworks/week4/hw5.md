## 請以自己的話解釋 API 是什麼

如果直接上網搜尋 API，會得到 Application Programming Interface（應用程式介面）的翻譯。但這樣子應該不是很好懂，比如說什麼是**介面**？

於是說又再上網搜尋，得到這樣的解釋

> the place at which independent and often
unrelated systems meet and act on or
communicate with each other; the manmachine interface

介面是

1. 一件事情發生的場所
2. 兩個個體、系統互動的方式
3. 用途為溝通或是傳遞

那麼既然是溝通，就得要確保雙方使用相同的語言，就像你不可能用中文去跟美國人溝通吧，所以 API 就是基於雙方需要交換資訊，因此設計的一種語言。

當你去麥當勞點餐，看著頭上那行圖片，你知道麥當勞提供 1號餐XXX, 2號餐XXX ......，也可以選擇套餐是薯條還是沙拉，這些是麥當勞提供給顧客的點餐方式，在這麥當勞等同於 Server 的角色，而顧客則是 Client，店面內的菜單則是 API。

如果沒有菜單（API），顧客可能會進去麥當勞說「我要一碗牛肉麵，不要加蔥，也不用辣」，阿問題是人家就沒有提供牛肉麵，顧客再怎麼要求麥當勞都做不出來。

credit: [API 到底是什麼？ 用白話文帶你認識
](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33), 宜秀教授的人機互動課程

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

基本上 HTTP status code 可以開頭區分成五類

1. 1XX： Server 已接受到請求，需要 Client 稍等
2. 2XX： 請求已成功
3. 3XX： 需 Client 有額外的動作，如重新導向等
4. 4XX： Client 端錯誤
5. 5XX： Server 端錯誤

額外補充 HTTP status code

1. 431： Server 拒絕處理請求，因 Request Header 字串過大
2. 409： 多個 Request 產生衝突，例如多個同步更新造成的衝突
3. 204： Request 成功，但沒有任何的 Response


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

> 一個好的 API 應該要有下列條件
>
1. 完整的 API 文件說明與規範
2. 有範例程式，解釋如何運用於應用程式中
3. 有教學指引，一步一步帶領開發者學習使用 API
4. 合理的命名規則
5. 適當的防呆措施、必須預防開發者在錯誤使用時，也不會造成嚴重的傷害
6. 一開始就要有清楚的規劃、使用情境，因為一但更新或改動，客戶端都要做相對的審視與修改。
>
參考 [yakimhsu 助教](https://yakimhsu.com/project/project_w4_Network_API.html)


Base URL: ``https://api.eatwhatyouwant.com/``

**Request**

|info|Method|path|parameters|instance|
|:----:|:------:|:----:|:----------:|:--------:|
|獲取所有餐廳|GET|/restaurants|_limit(optional): 限制回傳資料數量|/restaurants?_limit=10|
|獲取單一餐廳|GET|/restaurants/:id|none|/restaurants/3|
|刪除餐廳|DELETE|/restaurants/:id|none|none|
|新增餐廳|POST|/restaurants|name(required): 餐廳名稱|none|
|更改餐廳|PATCH|/restaurants/:id|name(required): 餐廳名稱|none|

**Response**

1. HTTP status code
    * 200: 操作正常
    * 400: Client 端參數錯誤
    * 404: 查無此資源
    * 500: 伺服器端錯誤
2. format: JSON
3. example

```
[
    {
    "id": "1",
    "name": "MOS Burger",
    "tel": "02-2938-1823"
    "city": "Taoyuan",
    },
    {
    "id": "2",
    "name": "SOS Burger",
    "tel": "02-2128-1923"
    "city": "Taipei",
    },
]
```