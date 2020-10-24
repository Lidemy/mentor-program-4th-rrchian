<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;
  
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  };
  $items_per_page = 3;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    'SELECT '.
    'C.id AS id, C.content AS content, '.
    'C.create_at AS create_at, U.nickname AS nickname, U.username AS username '.
    'FROM rexrexchian_w11_comments AS C ' .
    'LEFT JOIN rexrexchian_w11_users AS U ON C.username = U.username '.
    'WHERE C.is_deleted IS NULL '.
    'ORDER BY C.id DESC '.
    'LIMIT ? OFFSET ?'  
  );
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
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
    <header class="warning">嗨！這是程式導師實驗計畫第四期第十一週的作業。網站已更新資訊安全的防護，歡迎各種惡意攻擊。</header>
    <?php if(!$username) { ?>
    <a href="register.php" class="btn_register">註冊</a>
    <a href="login.php" class="btn_login">登入</a>
    <?php } else{ ?>
    <a href="handle_logout.php" class="btn_logout">登出</a>
    <?php }?>
    <? if($username){?>
    <?php if($user['role'] === 'admin'){?>
    <a href="backstage.php" class="btn_logout">後台</a>
    <?php } ?>
    <?php } ?>
  </div>
  <main class="main-wrap">
    <div class="input">
        <?php 
        if(!empty($_GET['errCode'])){
          $errCode = $_GET['errCode'];
          if($errCode === '1'){
            echo '<h2 class="error">' . '資料不齊全' . '</h2>';
            }
          else if($errCode === '4'){
            echo "<script>alert('警告：您已被停權');</script>";
            }
          }
        ?>
        <?php if($username) { ?>
          <h3 class="login_hello">你好！<?php echo escape($username); ?></h3>
              <span class="btn_update-nickname">編輯暱稱</span>
              <form class="hide update-nickname_form" method="POST" action="handle_update_user.php">
                <div class="input__nickname">
                  <span>新的暱稱：</span>
                  <input type="text" name="nickname" />
                  <input class="btn__submit" type="submit" />
                </div>
              </form>
          <form action="handle_add_comment.php" method="post">
            <div class="input__comment"> 
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
          while($row = $result->fetch_assoc()){
        ?>
        <div class="comment">
          <div class="user--info">
            <div class="user--avatar"><img src="avatar.jpg" alt=""></div>
            <span class="user--info--name"><?php echo escape($row['nickname'])?>(@<?php echo escape($row['username']); ?>)</span>
            <span class="user--info--time"><?php echo escape($row['create_at'])?></span>
          </div>
          <p class="comment__message">
            <?php echo escape($row['content'])?>
          </p>
          <? if($username){?>
          <?php if ($row['username'] === $username) { ?>
              <a class="btn_edit" href="update_comment.php?id=<?php echo $row['id'] ?>">編輯</a>
          <? } ?>
          <?php if ($row['username'] === $username || $user['role'] === 'admin') { ?>
              <a class="btn_edit" href="handle_delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a>
          <? } ?>
          <? }?>
        </div>
        <?php }?>
          <?php
        $stmt = $conn->prepare(
          'SELECT count(id) AS count FROM rexrexchian_w11_comments WHERE is_deleted IS NULL'
        );
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page-info">
        <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?> 
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a> 
        <?php } ?>
      </div>
    </div>
  </main>
  <script>
    var btn = document.querySelector('.btn_update-nickname')
    btn.addEventListener('click', function() {
      var form = document.querySelector('.update-nickname_form')
      form.classList.toggle('hide')
    })
  </script>
</body>
</html>