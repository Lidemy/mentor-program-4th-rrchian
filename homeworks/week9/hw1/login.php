<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MTR04 Week9 留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="header-wrap">
    <header class="warning">嗨！這是程式導師實驗計畫第四期第九週的作業。目前網站尚未更新資訊安全的防護，註冊請勿使用真實帳號及密碼。</header>
    <a href="index.php" class="btn_register">返回</a>
    <a href="register.php" class="btn_login">註冊</a>
  </div>
  <main class="main-wrap">
    <div class="input">
        <?php 
        if(!empty($_GET['errCode'])){
          $errCode = $_GET['errCode'];
          if($errCode === '1'){
            echo '<h2 class="error">' . '資料不齊全' . '</h2>';
            }
            else if ($errCode === '2'){
                echo '<h2 class="error">' . '帳號已有人使用' . '</h2>';
            }
            else if ($errCode === '3'){
                echo '<h2 class="error">' . '帳號或密碼輸入錯誤' . '</h2>';
            }
          }
        ?>
      <form action="handle_login.php" method="post">
        <div class="input__nickname">
          <span>帳號：</span><br>
          <input type="text" name="username">
        </div>
        <div class="input__nickname">
          <span>密碼：</span><br>
          <input type="password" name="password">
        </div>
        <input type="submit" value="送出！" class="btn__submit">
      </form>
    </div>
  </main>
</body>
</html>