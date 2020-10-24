<?php
  require_once("conn.php");
  
  function getUserFromUsername($username){
    global $conn;
    $sql = sprintf("SELECT * FROM rexrexchian_w11_users WHERE username = '%s'", $username);
    $result = $conn->query($sql);
    $row = $result -> fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>
