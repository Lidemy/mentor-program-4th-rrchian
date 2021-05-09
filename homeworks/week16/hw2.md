## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
Ans:
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

### 詳解

變數型態的作用域：
1. var -> function scope
2. let, const -> block scope

JS 屬於靜態作用域，作用域在宣告時即決定，不因呼叫方式而改變。

```javascript
var a = 'global'

function change(){
	var a = 10
	test()
}

function test(){
	console.log(a) // 會輸出 global 而不是 10
}

change()
```

題目中的 `var i = 0` 不在函式中宣告，因此等同於全域變數，可以看作這樣：

```javascript
var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. 執行 for 迴圈的第一圈，`i = 0`，執行 `console.log('i: ' + i)`，因此印出 `i: 0`，執行 `setTimeout()`，由於 `setTimeout` 屬於非同步的 Web API，因此將內部的匿名函式 `() => { console.log(i) }` 交由 Web API 管理，並開始計時，此時的 `setTimeout` 計時為 0s。

2. 由於迴圈內的一至五圈的 `setTimeout` 都屬於非同步的 Web API，因此內部的匿名函式 `() => { console.log(i) }` 都會交由 Web API 管理，並計時，分別為 0s、1s、2s、3s、4s，間隔一秒。

3. 此時的 `setTimeout` 皆交由 Web API 管理，`call stack` 執行迴圈內的 `console.log('i: ' + i)`，印出

    ```javascript
    i: 0
    i: 1
    i: 2
    i: 3
    i: 4
    ```
4. `call stack` 已清空，因此 `event loop` 會偵測 `queue` 有沒有待執行的函式，有，已經計時完畢的 `() => { console.log(i) }`。

5. 這時全域變數 `i` 已經是迴圈跑完後的值 `5`，因此每隔一秒會印出 `5`。

所以答案是

```javascript
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

