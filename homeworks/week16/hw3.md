## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a) // A, undefined
  var a = 5
  console.log(a) // B, 5
  a++
  var a
  fn2()
  console.log(a) // D, 20
  function fn2(){
    console.log(a) // C, 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // E, 1
a = 10
console.log(a) // F, 10
console.log(b) // G, 100
```

### 名詞解釋

EC：execution context，當程式進入一個 function 時，就會產生一個 EC，而 EC 裡面會儲存和這個 function 有關的資訊，並把這個 EC 放入 stack 裡面，如果這個 function 執行完畢，就會結束這個 EC。要注意在程式讀檔時，就會先產生一個 global EC。

VO：在每個 EC 內部，都會再有一個 variable object(VO)，宣告的變數和函式都會被放在當下 EC 的 VO 裡面，如果當下的 EC 是 function，那傳入的參數也會被放到 VO 裡面。可以把 VO 想像成平常我們使用的 object 那個樣子。

AO：類似於 VO。差別在 AO 屬於 function EC，多了 arguments 這個屬性，其他地方都和 VO 差不多。

scope chain：每一個 EC 都有 scope chain，而 scope chain 為當前 function AO 和 [[Scope]] 這個屬性。[[Scope]] 是在 function 建立時設定的 scope。

所以說
1. 建立 function A 時，會設置 A.[[Scope]] = scope chain of current EC
2. 進入 function A 時，產生新的 EC，並設置 EC.scopeChain = AO + A.[[Scope]]

### hoisting 底層實作

當我們進入 EC 時（大概就是執行 function 後，但還沒開始執行 function 內的程式碼之前），會按照順序做下面這三件事：

1. 參數放進 VO 並設定值，傳進什麼值就設定什麼值，沒有值則初始化成 undefined
2. 把 function 放進 VO, 同名則覆蓋
3. 變數「宣告」放進 VO, 同名則忽略

然後在 hoisting 中，有順序之分： function > arguments > variables。

### 詳解（模擬 JS 引擎執行的方式）

1. 讀檔初始化環境
```javascript
global EC: {
	VO: {
		a: undefined,
		fn: func,
	}
	scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

2. 讀檔初始化環境後，執行 `var a = 1` 這一行
```javascript
global EC: {
	VO: {
		a: 1,
		fn: func,
	}
	scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

3. 進入 fn，初始化 fn 內部的環境
```javascript
fn EC: {
  AO: {
    a: undefined,
    fn2: func,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1,
    fn(): func,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

4. 執行 `console.log(a)`，A 會印出 `undefined`

在執行這行程式碼時， fnEc.AO.a 仍屬於 `undefined` 尚未賦值，因為 `var` 型態 hoisting 時僅提升宣告。

5. 執行 `var a = 5`

```javascript
fn EC: {
  AO: {
    a: 5,
    fn2: func,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1,
    fn(): func,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

6. 執行 `console.log(a)`，B 會印出 `5`

fnEC.AO.a 值為 5

7. 執行 `a++` 

```javascript
fn EC: {
  AO: {
    a: 6,
    fn2: func,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1,
    fn(): func,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

8. 執行 `var a`

由於 fnEC.AO 內已有 a 這個變數，所以宣告沒有影響。

9. 進入 fn2，初始化 fn2 內部的環境

```javascript
fn2 EC: {
  AO: {
  },
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fn EC: {
  AO: {
    a: 6,
    fn2: func,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1,
    fn(): func,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

10. 執行 `console.log(a)`，C 印出 `6`

由於 fn2EC.AO 沒有 `a` 這個變數，所以循著 fn2EC.scopeChain 向上層搜索，於 fnEC.AO 找到 `a`，值為 6。

11. 執行 `a = 20`

同 10. 向上層搜索，最後於 fnEC.AO 將 a 設定為 20。

12. 執行 `b = 100`

同 10. 向上層搜索，由於都沒有設定 `b` 這個變數，最後於 globalEC.AO 將 b 設定為 100

13. fn2 執行結束，離開 stack
```javascript
fn EC: {
  AO: {
    a: 20,
    fn2: func,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1,
    fn(): func,
    b: 100,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

14. 執行 `console.log(a)`，D 印出 `20`

fnEC.AO.a 值為 20

15. fn 執行結束，離開 stack

```javascript
global EC: {
  VO: {
    a: 1,
    fn(): func,
    b: 100,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

16. 執行 `console.log(a)`，E 印出 `1`

globalEC.VO.a 值為 1

17. 執行 `a = 10`

```javascript
global EC: {
  VO: {
    a: 10,
    fn(): func,
    b: 100,
  }
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO]
```

18. 執行 `console.log(a)`，F 印出 `10`

globalEC.VO.a 值為 10

19. 執行 `console.log(b)`，G 印出 `100`

globalEC.VO.b 值為 100
