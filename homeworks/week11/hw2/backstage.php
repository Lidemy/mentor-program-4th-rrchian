<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  // 登入後才能進的頁面
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
  }
 
  $stmt = $conn->prepare(
    'SELECT '.
    'Comm.id AS id, Comm.title AS title, Comm.content AS content, '.
    'Comm.create_at AS create_at, User.username AS username '.
    'FROM rexrexchian_w11_hw2_comments AS Comm ' .
    'LEFT JOIN rexrexchian_w11_hw2_users AS User ON Comm.username = User.username '.
    'WHERE Comm.is_deleted = 0 ORDER BY id DESC'
  );
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();

?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>Chian's Blog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php
  // REQUEST_URI: 訪問此頁面需要的 URL
  $uri = $_SERVER['REQUEST_URI'];
  $isAdminPage = (strpos($uri, 'backstage.php') !== false)
  ?>
<nav class="navbar">
  <div class="wrapper navbar__wrapper">
    <div class="navbar__site-name">
      <a href='index.php'>Chian's Blog</a>
    </div>
    <ul class="navbar__list">
      <div>
        <li><a href="all_articles.php">文章列表</a></li>
        <li><a href="#">分類專區</a></li>
        <li><a href="#">關於我</a></li>
      </div>
      <div>
        <?php if (!empty($_SESSION['username'])) { ?>
          <?php if ($isAdminPage) { ?>
            <li><a href="new_article.php">發布文章</a></li>
          <? } else { ?>
            <li><a href="backstage.php">管理後台</a></li>
          <? } ?>
          <li><a href="logout.php">登出</a></li>
        <?php } else { ?>
          <li><a href="login.php">登入</a></li>
        <?php } ?>
      </div>
    </ul>
  </div>
</nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="admin-post">
            <div class="admin-post__title">
                <?php echo escape($row['title']); ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['create_at']); ?>
              </div>
              <a class="admin-post__btn" href="update_article.php?id=<?php echo escape($row['id']); ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="handle_delete.php?id=<?php echo escape($row['id']); ?>">
                刪除
              </a>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Chian's Blog All Rights Reserved.</footer>
</body>
</html>