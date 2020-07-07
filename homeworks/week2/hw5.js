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