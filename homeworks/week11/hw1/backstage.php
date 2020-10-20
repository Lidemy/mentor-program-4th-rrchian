<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;
  
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $role = getUserFromUsername($username)['role'];
  }

  if($role !== 'admin'){
    header('Location: ./index.php');
    exit();
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  };
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    'SELECT '.
    'U.id AS id, U.role AS role, U.username AS username '.
    'FROM rexrexchian_w11_users AS U ' .
    'WHERE U.role != "admin" '.
    'ORDER BY U.id DESC '.
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
    <a href="index.php" class="btn_logout">首頁</a>
    <a href="backstage.php" class="btn_logout">後台</a>
  </div>
  <main class="main-wrap">
    <div class="input">
      <h3 class="login_hello">你好！<?php echo escape($username); ?></h3>
    </div>
    <div class="comments">
        <h1>使用者清單</h1>
        <?php
          while($row = $result->fetch_assoc()){
        ?>
        <div class="comment">
          <div class="user--info">
            <div class="user--avatar"><img src="avatar.jpg" alt=""></div>
            <span class="user--info--time">role: <?php echo escape($row['role'])?></span>
            <span class="user--info--name">username: <?php echo escape($row['username'])?></span>
            <a class="btn_role" href="update_role_regular.php?id=<?php echo $row['id'] ?>">一般</a>
            <a class="btn_role" href="update_role_blocked.php?id=<?php echo $row['id'] ?>">停權</a>
          </div>
        </div>
        <?php }?>
        <?php
          $stmt = $conn->prepare(
            'SELECT count(id) AS count FROM rexrexchian_w11_users as U WHERE U.role != "admin" '
          );
          $result = $stmt->execute();
          $result = $stmt->get_result();
          $row = $result->fetch_assoc();
          $count = $row['count'];
          $total_page = ceil($count / $items_per_page);
        ?>
      <div class="page-info">
        <span>總共有 <?php echo $count ?> 名使用者，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?> 
          <a href="backstage.php?page=1">首頁</a>
          <a href="backstage.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="backstage.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="backstage.php?page=<?php echo $total_page ?>">最後一頁</a> 
        <?php } ?>
      </div>
    </div>
  </main>
</body>
</html>