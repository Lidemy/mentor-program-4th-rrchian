<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
 
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
  }

  $page = $_POST['page'];

  if (
    empty($_POST['id']) ||
    empty($_POST['content']) || 
    empty($_POST['title'])
  ) {
    header('Location: ' . $page);
    die('資料不齊全');
  }

  $id = $_POST['id'];
  $content = $_POST['content'];
  $title = $_POST['title'];

  $sql = "UPDATE rexrexchian_w11_hw2_comments SET title = ? , content = ? WHERE id = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);
  
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: " . $page);
?>
