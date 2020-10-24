<?php
      session_start();
      require_once('conn.php');
      require_once('utils.php');    

    if(empty($_POST['content'])){
        header('Location: index.php?errCode=1');
        die('資料不完整');
    }

    $username = $_SESSION['username'];
    $content = $_POST['content'];
    $user = getUserFromUsername($username);

    if($user['role'] == 'admin' || $user['role'] == 'regular'){
            
        $sql = "INSERT INTO rexrexchian_w11_comments(username, content) VALUES(?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $username, $content);
        $result = $stmt->execute();
    
        if(!$result){
            die($conn->error);
        }

        header("Location: index.php");
    }
    else {
        header("Location: index.php?errCode=4");
    }
?>