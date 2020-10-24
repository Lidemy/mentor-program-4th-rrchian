<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

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
