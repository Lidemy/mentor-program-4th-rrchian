<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
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
  <div class="login-wrapper">
    <h2>Login</h2>
    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type='submit' value="登入" />
    </form>
  </div>
</body>
</html>