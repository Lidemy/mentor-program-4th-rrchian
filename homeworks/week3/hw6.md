## hw1：好多星星

這一題算解得滿順的，好像差不多十分鐘左右。因為是印出東西的題目，其實跟以前做的應該都大同小異（？）所以先觀察規律。一開始做的時候，是直接印出 n 個星星，比方說 3 好了，我就直接印出 \*\*\* ，而不是題目要的 \*, \*\*, \*\*\*，看到這個結果就大概知道原因，應該是 console.log() 設在迴圈外面，所以只有印出最後的值，所以就把 console.log() 丟進迴圈裡面，叮咚！一個兩個三個星星就這樣印出來了。然後原本有考慮換行的問題，但 console.log() 似乎在每次印出的時候就會直接換行。

## hw2：水仙花數

第一次解真的想不出來，直接先去睡覺再說⋯⋯

下面是第一次的程式碼，邏輯大概是先把 input 的值跑一次，然後把數字轉成字串去判斷這個數字有幾個位數，然後再根據水仙花數的算法去判斷是不是水仙花數，只要符合的就印出來。大概是這樣。

題外話，因為我習慣直接在線上的開發環境寫 code，但照這樣寫的話常常會跑不出結果，感覺是哪邊的程式有出了問題，不是吃太多效能就是邏輯有錯（吧）。

```
function findNarNumber(min,max){
	for(i=min;i<=max;i++){
  	var str = i.toString()
    for(i=0;i<=str.length;i++){
      temp = Math.pow(str[i], str.length)
    }
  } 
}

findNarNumber(5,200)
```

第二個版本

```
function solve(lines) {
    var line = lines[0]
    let input = line.split(" ")
    for(let i = input[0]; i <= input[1]; i++){
        if(isNarNumber(i)){
            console.log(i)
        }
    }
}

function isNarNumber(n){
    let str = n.toString() // 153
    let digit = Array.from(str) //['1','5','3']
    let value = 0
    for(let i=0;i<=digit.length;i++){
        value += digit[i] ** digit.length
    }
    if(value === n){
        return true
    }
    return false
}
```

照樣是符合找出位數，並依照水仙花數的算法去找出水仙花數。在如何把數字轉到字串、陣列，以求位數的步驟花了點時間，不過丟到 OJ 上判定超時，還不確定這樣寫對不對。

> 經由加爆 console.log 發現用 input[0] 去存取 input 會得到的是字串，所以迴圈沒有執行到

> 用 typeof 檢測每個設定的變數，有些以為是數字但實際上是字串，所以程式運行不符預期

> 在迴圈裡設定起始變數為 j，結果寫成 i++，導致變成無窮迴圈，而且 debug 一小時才終於找到這個蠢問題......

最終版本

```
function solve(lines) {
    var line = lines[0]
    let input = line.split(" ") // ['5','200']
    // 從 min 到 max
    for(let i = Number(input[0]); i <= Number(input[1]); i++){
        let str = i.toString()
        let digit = Array.from(str)
        let value = 0
        for(let j=0;j<digit.length;j++){
            value += Number(digit[j]) ** digit.length
        }
        if(value === i){
            console.log(i)
        }
    }
}
```

基本的解題想法都沒有改變，主要是確認型態，以及微小的 bug......，真的大推 console.log 跟 typeof() 來除錯，可以讓程式符合腦中的想法。

特別感謝 [@MoreCoke](https://github.com/Lidemy/mentor-program-4th-MoreCoke) 讓我意識到型態的問題。

## hw3：判斷質數

初版

```
function solve(lines) {
    let length = Number(lines[0])
    for(let i = 1; i <= length; i++){
        if(isPrime(Number(lines[i]))){
            console.log('Prime')
        }
        else{
            console.log('Composite')
        }
    }
}

function isPrime(n){
    console.log(n)
    if(n === 1){
        return false
    }
    for(let j=2; j < n; j++){
        if(n % j === 0){
            console.log(n)
            return true
        }
    }
    return false
}
```

實際輸入 input [1,2,3,4,5] ，結果為 [C,C,C,P,C]，檢測是否有哪邊的程式邏輯出問題。

> 比起在 isPrime(n) 裡 return 布林值再印出 Composite 或 Prime，不如直接在 isPrime(n) 裡 return 相應的字串，然後從主要 function 印出，可讀性比較高

> 這裡也犯蠢了XDD，我還在想為什麼輸出為什麼跟正確解答有這種完美的互補，原來是在 isPrime 裡被自己的邏輯搞混，因為如果輸入被 1 以外的數字整除，應該就是合數，反過來說，就是要回傳 false，但我卻回傳 true。

最終版

```
function solve(lines) {
    let length = Number(lines[0])
    for(let i = 1; i <= length; i++){
        console.log(isPrime(Number(lines[i])))
    }
}

function isPrime(n){
    if(n === 1){
        return 'Composite'
    }
    for(let j=2; j < n; j++){
        if(n % j === 0){
            return 'Composite'
        }
    }
    return 'Prime'
}
```

參考自我檢討後，修正程式碼

```
function solve(lines) {
    let length = Number(lines[0])
    for(let i = 1; i <= length; i++){
        console.log(isPrime(Number(lines[i])) ? 'Prime' : 'Composite')
    }
}

function isPrime(n){
    if(n === 1){
        return false
    }
    for(let j=2; j < n; j++){
        if(n % j === 0){
            return false
        }
    }
    return true
}
```

若是以我上個版本來看，我並沒有達到「可重複使用」的目標，因為我的 return 本質上還是印出字串而已，應該要 return 是否為質數的布林值，再在主程式輸出字串，這樣子如果以後需要再次使用到判斷質數的函式時，就不用再寫一次。**功能歸功能，log 歸 log，才會讓這個 function 可以重複使用。**

## hw4：判斷迴文

```
function solve(lines) {
    isPalindrome(lines[0])
}

function isPalindrome(str){
	let strPalin = ''
  for(i=str.length-1; i>=0; i--){
  	strPalin += str[i]
  }
  if(str === strPalin){
  	console.log('True')
    return
  }
  console.log('False')
}
```

可能因為之前課堂有寫過迴文的算式，所以也算是滿直覺就寫出來的。直接拿一個新的字串去從原字串的尾巴開始讀取。

## hw5：聯誼順序比大小

初版

```
function solve(lines) {
    // 總共有幾組
    for(let i=1; i<= Number(lines[0]); i++){
        // 每一組的規則及數字
        let [a,b,rule] = lines[i].split(' ')
        console.log(result(a,b,rule))
    }
}

function result(a,b,rule){
    // 平手
    if(a === b){
        return 'DRAW'
    }
    // 比大
    else if(Number(rule) === 1){
        if( a > b) {
            return 'A'   
        }
        else{
            return 'B'    
        } 
    }
    // 比小
    else{
        if( a < b) {
            return 'A'   
        }
        else{
            return 'B'    
        } 
    }
}
```

先寫好最基本的版本，輸入測資都有通過，但胡立有提到這一題要特別注意大數的比大小，目前的寫法還沒考量到這點，理所當然的 WA，目前想法可能是可以比較 a 和 b 的位數，再從左邊開始比大小，不過目前還不曉得該怎麼寫，等睡醒再說XD

字串版本

```
function solve(lines) {
    // 總共有幾組
    for(let i=1; i<= Number(lines[0]); i++){
        // 每一組的規則及數字
        let [a,b,rule] = lines[i].split(' ')
        console.log(result(a,b,rule))
    }
}

function result(a,b,rule){
    let strA = a.toString()
    let strB = b.toString()
    if(strA === strB){
        return 'DRAW'
    }
    if(Number(rule) === 1){
        if(strA.length > strB.length){
            return 'A'
        }
        if(strA.length < strB.length){
            return 'B'
        }
        else if(strA.length === strB.length){
            for(i=0;i<=strA.length;i++){
                if(strA.charAt(i) > strB.charAt(i)){
                    return 'A'
                }
                else{
                    return 'B'
                }
            }
        }
    }
    if(Number(rule) === -1){
        if(strA.length < strB.length){
            return 'A'
        }
        if(strA.length > strB.length){
            return 'B'
        }
        else if(strA.length === strB.length){
            for(i=0;i<=strA.length;i++){
                if(strA.charAt(i) < strB.charAt(i)){
                    return 'A'
                }
                else{
                    return 'B'
                }
            }
        }
    }
```

照著原始測資，以及自己丟幾個大數進去，測試結果應該都是正確，不過看著程式碼滿滿的迴圈跟判斷式，大概就知道可能會超出題目限制的運算時間，實際上也真的如此，可能想一下有什麼重複的地方可以優化。

> 看了幾位有被按讚的同學解答，發現都有用 ? : 這個三元運算子，好奇試用一下，只不過減少判斷式效能直接大提升，馬上 AC ......趕快把能用到這個運算子的地方都修一下程式碼