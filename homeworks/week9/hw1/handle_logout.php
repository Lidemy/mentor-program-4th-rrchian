<?php
  require_once('conn.php');

  $token = $_COOKIE['token'];
  $sql = sprintf("DELETE FROM rexrexchian_w9_tokens WHERE token = '%s'", $token);
  $conn->query($sql);

  setcookie("token", "", time() - 3600);

  session_start();
  session_destroy();

  header("Location: index.php");
?>