function capitalize(str) {
    if(str[0].charCodeAt() >= 97 && str[0].charCodeAt() <= 122){
        var str_upper = str[0].toUpperCase()
        var new_str = str.replace(str[0], str_upper)
    }
    return new_str
}

console.log(capitalize('hello'));