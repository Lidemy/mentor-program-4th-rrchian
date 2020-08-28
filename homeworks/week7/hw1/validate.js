/*

設定是否有錯
逐一檢查每個文字輸入框是否有內容
檢查 radio 是否有勾選
若有錯，添加 error class
若沒錯，alert 資訊

Reminder:
1. 若是用 querySelectorAll 選取元素，要執行動作（如添加 class 之類的），要用迴圈的方式讀取，不然會找不到 node。

*/

/* eslint-disable */


document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    let isError = false;
    let result = '這是您輸入的資訊：' + '\n';

    const requiredInfos = document.querySelectorAll('.required');

    for (let requiredInfo of requiredInfos) {
        const textInfo = requiredInfo.querySelector('input[type=text]')
        const radioInfos = requiredInfo.querySelectorAll('input[type=radio]')
        //有沒有文字
        if (textInfo) {
            if (!textInfo.value) {
                textInfo.parentNode.classList.remove('hide_error');
                isError = true;
            } else {
                textInfo.parentNode.classList.add('hide_error');
                result += requiredInfo.innerText.replace('*', '').replace('\n', '').replace('\n', '').replace(' ', '') + '：' + textInfo.value + '\n';
            }
            //有沒有選擇選項    
        } else if (radioInfos.length) {
            const radioCheck = [...radioInfos].some(radio => radio.checked);
            if (!radioCheck) {
                radioInfos[0].parentNode.parentNode.classList.remove('hide_error');
                isError = true;
            } else {
                radioInfos[0].parentNode.parentNode.classList.add('hide_error');
                const title = requiredInfo.innerText.substr(0, 4);
                const value = requiredInfo.querySelector('input[type=radio]:checked').id;
                result += title + '：' + value + '\n';
            }
        }
    }

    if (isError) {
        alert('請確認尚未填寫的欄位');
    } else {
        alert(result);
    }

})