<?php
  require_once("conn.php");

  
  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
      "select * from rexrexchian_w11_hw2_users where username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

?>
