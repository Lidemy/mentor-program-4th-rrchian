## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

#### 文字相關的標籤
1. `<b>` 粗體 > <b>我是粗體</b>
2. `<i>` 斜體 > <i>我是斜體</i>
3. `<u>` 底線 > <u>我是底線</u>
4. `<sup>` 上標字 > 我是<sup>上標字</sup>
5. `<sub>` 下標字 > 我是<sub>下標字</sub>

#### 播放背景音樂：
`<bgsound/>` <br>
<pre>    屬性: (`src 路徑, loop 重複次數`)

#### 輸入框：
`<input />` <br>
屬性: (`type, name, id`)

type 又可再細分成 
1. text > <input type="text"/> 輸入文字框
2. password > <input type="password"/> 輸入密碼框，和文字框不同的是輸入的文字會看不到
3. button > <input type="button" value="按鈕"/>
4. submit > <input type="submit" value="送出表單"/>
5. reset > <input type="reset"/>
6. checkbox > <input type="checkbox"/> 多選框
7. radio > <input type="radio"/> 單選框，前提是 radio 的 name 屬性要相同
8. file > <input type="file"/> 上傳檔案

#### 特別標籤
1. `<hr/>`:  增加一行水平分隔線 <hr/>
2. `<blockquote>`: 引言區
<blockquote>
引言區
</blockquote>
3. `<optgroup>`: 把相關的選項放在一起

<select>
  <optgroup label="asia">
    <option value ="taiwan">台灣</option>
    <option value ="japan">日本</option>
  </optgroup>

  <optgroup label="europe">
    <option value ="german">德國</option>
    <option value ="franch">法國</option>
  </optgroup>
</select>


#### 跳脫字元：
為避免歧義，特殊符號可以以下形式表達
1	&amp; > **&**	 
2	&quot > **"**	 
3	&lt > **<**	 
4	&gt > **>**	 
5	&absp; > **空白**

[參考資料](http://web.thu.edu.tw/hzed/www/tag.htm)

## 請問什麼是盒模型（box model）

在瀏覽器上顯示元素時，渲染引擎會根據 CSS basic box model 去將元素表示成一個個的盒子。

<img src="boxmodel.png">

從裡到外分別是 content, padding, border, margin.

由於調整 CSS 時，padding, border 預設會往元素外面推出，以至於影響原先設定元素的寬高。

所以可以加上 `box-sizing: border-box` 這個屬性直接設定元素的寬高，若在這屬性下調整 padding, border，則會向內縮。

[參考資料](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

每一個 HTML 元素都有預設的 display 值，通常預設會是 inline, block 這兩種。若預設值為 block ，則為區塊元素，如 `<div>` `<header>` `<footer>` 等，會讓內容於新的一行顯示，並填滿容器；而若預設值為 inline ，則為行內元素，如 `<span>` `<a>` 等，會顯示在段落中不分行。

由於 inline 元素沒辦法獨立設定其 width, height，以及上下邊距，所以出現 display: inline-block 這個屬性，可以同時像 inline 元素並排，也可以像 block 元素調整寬高等屬性。

[參考資料](https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-css-%E7%9B%92%E6%A8%A1%E5%9E%8B-box-model-1b977df8d3d0)

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

static: 網頁預設的排版方式，會由左上至右下，從上到下繪製元素位置。

relative: 相對位置，讓元素與「原先」應該在的位置做偏移。

absolute: 絕對定位，參考點為以設置 absolute 元素的位置往上找，第一個不是 static 元素的位置。

fixed: 固定位置，為元素與 viewpoint 相對的定位。
