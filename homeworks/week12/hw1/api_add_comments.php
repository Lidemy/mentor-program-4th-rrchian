<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  // CORS
  header('Access-Control-Allow-Origin:*');

  // error handling
  if (empty($_POST['site_key']) || empty($_POST['nickname']) || empty($_POST['content'])) {
    $json = array(
      'ok' => false,
      'message' => 'Please input missing fields'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  $sql = 'INSERT INTO rexrexchian_w12_comments(site_key, nickname, content) VALUES (?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();

  // error handling
  if (!$result) {
    $json = array(
      'ok' => false,
      'message' => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    'ok' => true,
    'message' => 'Success'
  );
  $response = json_encode($json);
  echo $response;

?>
