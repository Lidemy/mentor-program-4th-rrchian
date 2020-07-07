function reverse(str) {
    var str_reverse = ''
    // 從後面讀取
    for(i=str.length-1; i>=0; i--){
    str_reverse = str_reverse + str[i]
    }
    console.log(str_reverse)
}

reverse('hello');

