## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined(use strict)
```

### `this`

`this` 和 `Scope` 不同，會根據呼叫的方式而改變值，而不是根據被定義的方式。

- 在物件導向中，`this` 的值就是對應到的 `instance`
- 在非物件導向中使用 `this`，會根據執行環境的不同而有不同的預設 global 變數。在瀏覽器中會得到 `Window`；在 Node.js 中會得到 `global`。
- 若是使用嚴格模式（`'use strict'`），`this` 的值為 `undefined`
- 在操作 `DOM` 時，`this` 會對應到操作事件的元素上。
  - 例如：

    ```javascript
    document.querySelector('.btn').addEventListener('click', function(){ this // 在這裡使用的 this，會對應到操作事件的按鈕上
    })
    ```
- 箭頭函式中的 `this` 和怎麼呼叫無關，反而是根據被定義的方式（總之就是和原本 `this` 的定義相反）

### 除了 `func()` 外，呼叫函式的其他兩種方式

1. `call()`：傳進去的第一個參數就是 `this` 的值。
2. `apply()`：和 `call` 基本相同，差別在 `apply` 的第二個參數會是一個陣列。

### `bind()`

可以透過 `bind` 強制設定 `this` 的值，要注意的是 `bind()` 會回傳 `function`。

```javascript
'use strict'

const obj = {
	a: 1,
	test: function(){
		console.log(this) 
	}
}

const bindTest = obj.test.bind(obj) // 強制把 obj.test 的 this 設定為 obj 這個物件
bindTest()
bindTest.call(123) // 還是輸出 obj，用 call() 也無法改變 this 的值
```

### 詳解

1. `obj.inner.hello()` 可以改寫成 `obj.inner.hello.call(obj.inner)`。因此傳進去的 `this` 的值是 `obj.inner`，所以 `console.log(this.value)` 會印出 `obj.inner.value`，也就是 `2`。

2. `obj2.hello()` 可以改寫成 `obj.inner.hello.call(obj.inner)`。同第一點，會印出 `2`。

3. `hello()` 可以改寫成 `hello.call()`，也可以改寫成 `obj.inner.hello.call()`，由於沒有傳入參數，若是嚴格模式，`this` 為 `undefined`。若是非嚴格模式下，瀏覽器和 Node.js 會分別對應到 `Window` 和 `global`，但因為 `Window.value` 和 `global.value` 都沒有值，因此也是印出 `undefined`。