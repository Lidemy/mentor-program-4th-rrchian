function join(arr, concatStr) {
    var arr_join = [];
    // 個別加入陣列元素與字串
    for(i=0; i<=arr.length-1; i++){
        arr_join.push(arr[i])
        arr_join.push(concatStr)
    }
    // 陣列轉字串
    var new_str = ""
    for(i=0; i<=arr_join.length-1; i++){
        new_str = new_str + arr_join[i]
    }
    return new_str
}

function repeat(str, times) {
    str_repeat = str 
    for(i=1; i<=times-1; i++){
        str = str + str_repeat
    }
    return str
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));

