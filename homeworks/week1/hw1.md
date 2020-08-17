## 交作業流程

請用文字一步步敘述應該如何交作業。

範例：

1. 新開一個 branch：`git branch hw1`
2. 切換到 branch：`git checkout hw1`

請將答案寫在 [hw1.md](hw1.md)。

---

由於作業需要助教批改，又因為助教與學生以網路聯繫，因此繳交作業需要運用到雲端的 git 服務來進行版本控制。

以順序列點來描述繳交作業的流程。

**操作完每一行 git 指令，養成檢查 git status 的習慣**

1. 將 github 上的程式實驗導師計畫 repo 下載至本地端
    1. ``cd desktop`` 
    > [已解決]: 每次開啟 terminal 有辦法預設就在桌面嗎？ [參考](https://www.goston.net/2013/11/19/4381/)
    2. ``git clone https://github.com/Lidemy/mentor-program-4th-rrchian.git``
2. 將下載的 repo git 到雲端上，並建立寫作業用的 branch
    1. ``git remote add origin https://github.com/Lidemy/mentor-program-4th-rrchian.git``
    2. ``git branch week1``
    3. ``git checkout week1``
    4. ``git add .``
    5. ``git commit -am 'test'``
    6. ``git push origin week1 ``
        > [已解決]：執行到這邊時，到 github 上都找不到已經建立的分支  
        
        > 以為 fork 與 classroom 是一樣的 branch 概念，但 fork 其實是將沒有權限的原專案，複製一份你擁有權限的檔案到你的帳號底下，如果變更後的 fork 想改變原專案，則提出 pull request 就好。classroom 則是 github 推出的功能，基本上就可以當作遠端的教室，可以提供老師批改作業、追蹤學生進度、建立學生資料庫等功能，將教室的主檔案加上後綴使學生加入。另外 fork 與 branch 的差別，我的理解是 fork 是直接複製完整的原檔案到新帳號底下，而 branch 則是原檔案開啟平行時空，若有需要再融回原時空，但主要還是在同一個資料夾裡。
3. 修改本地端的作業檔 hw'N'
    1. 儲存更改
4. 將作業用 branch 上傳至雲端
    1. ``git add.``
    2. ``git commit -am 'week1'``
    3. ``git push origin week1``
5. 回報作業
    1. 到 github 上點擊 pull request
    2. compare and pull request > 將 week1 merge 進 master
    3. create pull request
    4. 到 lidemy 學習系統 > 作業列表 > 新增作業（記得 PR 連結，是 pull request 頁面的連結，有問題的話可以在 PR 頁面詢問） 
6. 作業修改後
    1. 若 github 上的 pr 已經被 merge 後
    2. 到本地的 branch
    3. ``git checkout master``
    4. ``git pull origin master``
    5. ``git branch -d week1``
    6. ``git branch -v ``

----

1. 先看範例修改作業
2. ``git branch weekX``
3. ``git checkout weekX``
4. ``git commit -am ''``
5. ``git push origin weekX ``
6. 回報作業
    1. 到 github 上點擊 pull request
    2. compare and pull request > 將 week1 merge 進 master
    3. create pull request
    4. 到 lidemy 學習系統 > 作業列表 > 新增作業（記得 PR 連結，是 pull request 頁面的連結，有問題的話可以在 PR 頁面詢問） 
7. 作業修改後
    1. 若 github 上的 pr 已經被 merge 後
    3. ``git checkout master``
    4. ``git pull origin master``
    5. ``git branch -d week1``
    6. ``git branch -v ``

