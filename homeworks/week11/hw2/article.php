<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = intval($_GET['id']);

  $stmt = $conn->prepare(
    'SELECT '.
    'Comm.id AS id, Comm.title AS title, Comm.content AS content, '.
    'Comm.create_at AS create_at, User.username AS username '.
    'FROM rexrexchian_w11_hw2_comments AS Comm ' .
    'LEFT JOIN rexrexchian_w11_hw2_users AS User ON Comm.username = User.username '.
    'WHERE Comm.id = ?'
  );
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']); ?></div>
          <div class="post__actions">
            <?php if (!empty($_SESSION['username'])) { ?>
                <a class="post__action" href="update_article.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['create_at']); ?>
        </div>
        <div class="post__content"><?php echo escape($row['content']); ?></div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Chian's Blog All Rights Reserved.</footer>
</body>
</html>