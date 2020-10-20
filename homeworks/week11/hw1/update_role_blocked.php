<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];
  $role_blocked = 'blocked';

  $sql = "UPDATE rexrexchian_w11_users SET role = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role_blocked, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: backstage.php");
?>
