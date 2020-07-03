function join(arr, concatStr) {
    var arr_join = '';
    for (i=0; i<=arr.length-2; i++) {
        arr_join = arr_join + arr[i] + concatStr;
        }
    arr_join += arr[arr.length-1]
    return arr_join
}

function repeat(str, times) {
    str_repeat = str 
    for(i=1; i<=times-1; i++){
        str = str + str_repeat
    }
    return str
}

console.log(join(["a", "b", "c"], "!"));
console.log(repeat('a', 5));

/*
第二，hw5 的 join 那題，請試試看以下幾個 case 是否有回傳正確答案：

``` js
join([1, 2, 3], '')，正確回傳值：123
join(["a", "b", "c"], "!")，正確回傳值：a!b!c
join(["aaa", "bb", "c", "dddd"], ',,')，正確回傳值：aaa,,bb,,c,,dddd
```

要特別注意的是分隔符號只會在每個元素中間出現，所以如果你寫成：

``` js
function join(arr, concatStr) {
  let result = '';
  for (let i = 0; i < arr.length; i += 1) {
    result += arr[i] + concatStr;
  }
  return result;
}
```

是標準錯誤寫法，因為最後面會多了一個 concatStr。
*/