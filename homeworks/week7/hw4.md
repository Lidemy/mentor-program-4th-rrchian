## 什麼是 DOM？

DOM 全名是 Document Object Model，顧名思義可以理解成將網頁的 `Document` 轉換成 `Object` 的一種 `Model`。

什麼意思呢？因為當我們要存取網頁上的元素時，對於 HTML 而言， `div`、`h2` 等等都只是「標記」用的語言，所以當我們要拿到這些標記時，需要一種方式將「標記」轉換成「物件」讓 Javascript 存取。

如下圖所示，將 HTML 的結構轉成一層一層的物件樹。

![DOM](pic_htmltree.gif)

在物件樹中，最重要的是一層層中各個「節點」。

節點基本上可分為以下幾類：

1. Documet: 在整個物件樹的根層
2. Element: 原本 HTML 的標籤，如 `div`, `h2` 等等
3. Text: 在 HTML 標籤裡的內容
4. Attribute: 標籤內的屬性

[參考此文](https://ithelp.ithome.com.tw/articles/10202689)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞機制指的是，在 DOM 中，元素是以節點樹的方式綁定在一起。

因此，假設現在有一個節點樹是 `outer` > `inner` > `box` 的三層結構，若是我們在三者都綁上 `click` 的監聽器，當我們觸發 `box` 的監聽器時，會造成前兩層的元素也被觸發，這其實是因為 JS 中的事件傳遞機制所導致。

在傳遞機制中，主要分為三個階段： 捕獲（Capture）、元素自身（Target）、冒泡（Bubbling）。運作的方式會是當你觸發某元素的事件時，元素就會成為 `Target`，程式會從根節點（Document）向下捕獲至 `Target`，然後再從 `Target` 冒泡到根節點。

## 什麼是 event delegation，為什麼我們需要它？

那麼，假設我們有一組相似功能的按鈕，我們難道是用迴圈將監聽器綁上去嗎？但由於監聽器的寫法是使用 `callback function` 也就是說在觸發函式之前，程式已經將迴圈完成，因此輸出的數值會是迴圈的終值。

如

```
const btnGroup = document.querySelectorAll('.btn');
for(var i=1; i<=btnGroup.length; i++){
    btnGroup[i].addEventListener('click', function(e){
        console.log(i);
    })
}
```

解決辦法可以是一：將 i 以 let 宣告，轉為區域變數；或是二，使用按鈕上的自定義屬性 `data-` 讀取屬性值。

但接下來，假設我們擁有的按鈕數量是一千，甚至更多，又或是說按鈕是 **藉由 JS 動態新增** 呢？

這時候就可以利用事件傳遞機制來解決。因為事件傳遞的機制會 `向下捕獲，向上冒泡` ，因此如果在所有的按鈕都包在同一個 `class` 之下，並且將監聽器綁在父層元素上，那麼觸發按鈕時，事件會冒泡到父層，也不會錯過任何一個新增的按鈕。

這樣子把監聽器不直接綁在元素上，而是綁在其父層元素上的做法，就稱作 `事件代理（event delegation）`。

[參考此文](https://yakimhsu.com/project/project_w7_eventListener.html)

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault() 直譯是「終止預設行為」，而 event.stopPropagation() 則是「終止事件傳導」，那麼實際上差在哪裡呢？

```
<a id="hyper" href="https://dotblogs.com.tw/harry">Harry's Tech World</a>

<script type="text/javascript">

$("#hyper").click(function()
{
    //終止預設行為
    event.preventDefault();
});

</script>
```

在這段程式碼中，有一個超連結，若是我們使用 `event.preventDefault()` ，則「終止其預設行為」，超連結的預設行為就是連到其他網頁去，因此當你點擊連結時，網頁不會有反應。

而下個例子則是 `event.stopPropagation()`

```
<div id="div1">
   <a id="hyper" href="https://dotblogs.com.tw/harry">Harry's Tech World</a>
</div>
<script type="text/javascript">

$("#hyper").click(function()
{
  //終止預設行為
  event.preventDefault();
  console.log("hyper click");
});

$("#div1").click(function()
{
  console.log("div1 click");
});
</script>

```

在這段程式碼中，我們將剛剛的超連結包在一個 `div` 中，當我們點擊連結時，並不會導向至其他網頁，因為超連結的預設行為已經被 `event.preventDefault()` 停住，然而 `console` 卻會依序顯示 `hyper click, div1 click`。這是為什麼呢？明明我們只有點擊超連結，卻連 `div` 上的點擊文字都顯示出來，這是因為 JS 的事件傳遞會向上冒泡，若我們想停止其父層元素的事件，則可以使用 `event.stopPropagation()`。

```
<div id="div1">
   <a id="hyper" href="https://dotblogs.com.tw/harry">Harry's Tech World</a>
</div>
<script type="text/javascript">

$("#hyper").click(function()
{
  //終止預設行為
  event.preventDefault();
  //終止事件傳導
  event.stopPropagation();
  console.log("hyper click");
});

$("#div1").click(function()
{
  console.log("div1 click");
});
</script>
```

這樣子當點擊連結時，就不會導向至其他分頁，也不會觸發到 `div1` 的事件了。
    
[參考此文](https://dotblogs.com.tw/harry/2016/09/10/131956)