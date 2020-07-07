function printFactor(n) {
    for(i=1; i<=n; i++){
        // 整除
        if(n%i == 0){
            console.log(i)
        }
    }
}

printFactor(10);

