<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $stmt = $conn->prepare('SELECT * FROM rexrexchian_w11_comments WHERE id = ? AND username = ?');
  $stmt->bind_param("is", $id, $username);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MTR04 Week11 留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="header-wrap">
    <header class="warning">嗨！這是程式導師實驗計畫第四期第十一週的作業。網站已更新資訊安全的防護，歡迎各種惡意攻擊。</header>
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
          <form action="handle_update_comment.php" method="post">
            <div class="input__comment"> 
              <span>在這修改留言：</span>
              <textarea name="content" id="content" cols="30" rows="5"><?php echo $row['content']?></textarea>
              <input type="hidden" name="id" value="<?php echo $row['id']?>"/>
            </div>
            <input type="submit" value="送出！" class="btn__submit">
          </form>
        <?php } ?>
    </div>
  </main>
</body>
</html>