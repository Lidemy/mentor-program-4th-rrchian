<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $result = $conn->query("SELECT * FROM rexrexchian_w9_comments ORDER BY id DESC");
  if (!$result) {
    die('Error:' . $conn->error);
  }
?>

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
    <?php if(!$username) { ?>
    <a href="register.php" class="btn_register">註冊</a>
    <a href="login.php" class="btn_login">登入</a>
    <?php } else{ ?>
    <a href="handle_logout.php" class="btn_logout">登出</a>
    <?php }?>
  </div>
  <main class="main-wrap">
    <div class="input">
        <?php 
        if(!empty($_GET['errCode'])){
          $errCode = $_GET['errCode'];
          if($errCode === '1'){
            echo '<h2 class="error">' . '資料不齊全' . '</h2>';
            }
          }
        ?>
        <?php if($username) { ?>
          <form action="handle--add--comment.php" method="post">
            <div class="input__comment"> 
              <h3 class="login_hello">你好！<?php echo $username; ?></h3>
              <span>在這裡寫下一些訊息：</span>
              <textarea name="content" id="content" cols="30" rows="5"></textarea>
            </div>
            <input type="submit" value="送出！" class="btn__submit">
          </form>
        <?php } else { ?>
          <h3 class="login_reminder">請登入帳號以發布留言</h3>
        <?php }?>
    </div>
    <div class="comments">
        <h1>大家的留言</h1>
        <?php
          $result = $conn->query("SELECT * FROM rexrexchian_w9_comments ORDER BY id DESC");
          while($row = $result->fetch_assoc()){
        ?>
        <div class="comment">
          <div class="user--info">
            <div class="user--avatar"><img src="avatar.jpg" alt=""></div>
            <span class="user--info--name"><?php echo $row['nickname']?></span>
            <span class="user--info--time"><?php echo $row['create_at']?></span>
          </div>
          <p class="comment__message">
            <?php echo $row['content']?>
          </p>
        </div>
          <?php }?>
    </div>
  </main>
</body>
</html>