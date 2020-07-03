``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 3 行，設定變數 i 是 0，檢查 i 是否 小於 arr 的長度，是，繼續執行，進行第一圈迴圈
2. 執行第 4 行，若 arr 的第 1(i+1) 個元素小於等於 0，回傳 invalid
3. 第一圈迴圈結束，跑回第 3 行，i++，i 等於 1，檢查 i 是否 小於 arr 的長度，是，繼續執行
4. 重複 1 ~ 3 的步驟直到第 6 圈迴圈（因 arr 長度為 6）
5. 執行第 6 行，設定變數 i 是 2，檢查 i 是否 小於 arr 的長度，是，繼續執行，進行第一圈迴圈
6. 執行第 7 行，若 arr 的第 3(i+1) 個元素不等於 arr 的第 2(i+1-1) 和第 1(i+1-2) 個元素的相加，回傳 invalid
7. 第一圈迴圈結束，跑回第 6 行，i++，i 等於 3，檢查 i 是否 小於 arr 的長度，是，繼續執行
8. 重複 5 ~ 7 的步驟直到 i = 5（因為當 i=5 時已經是 arr 的第 6 個元素）
9. 執行第 9 行，回傳 valid
10. 執行完畢