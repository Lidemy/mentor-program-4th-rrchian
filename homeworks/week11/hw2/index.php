<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  };
  $items_per_page = 5;   
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    'SELECT '.
    'Comm.id AS id, Comm.title AS title, Comm.content AS content, '.
    'Comm.create_at AS create_at, User.username AS username '.
    'FROM rexrexchian_w11_hw2_comments AS Comm ' .
    'LEFT JOIN rexrexchian_w11_hw2_users AS User ON Comm.username = User.username '.
    'WHERE Comm.is_deleted = 0 ORDER BY id DESC '.
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
      <?php
        while($row = $result->fetch_assoc()) {
      ?>
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
          <!-- substr 要記得設定初始值跟終值 -->
          <div class="post__content"><?php echo substr(escape($row['content']), 0, 200); ?>
          </div>
          <a class="btn-read-more" href="article.php?id=<?php echo escape($row['id']); ?>">READ MORE</a>
        </article>
      <?php } ?>
            <?php
        $stmt = $conn->prepare(
          'SELECT count(id) AS count FROM rexrexchian_w11_hw2_comments WHERE is_deleted = 0'
        );
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page-info">
        <span>總共有 <?php echo $count ?> 篇文章，頁數：</span>
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
  </div>
  <footer>Copyright © 2020 Chian's Blog All Rights Reserved.</footer>
</body>
</html>