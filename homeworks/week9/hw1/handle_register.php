<?php
    require_once('conn.php');

    if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])){
        header('Location: register.php?errCode=1');
        die();
    }

    $nickname = $_POST['nickname'];    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $sql = sprintf("INSERT INTO rexrexchian_w9_users(nickname, username, password) VALUES('%s', '%s', '%s')", $nickname, $username, $password);
    $result = $conn->query($sql);

    if(!$result){
        if(strpos($conn->error, "Duplicate entry") !== false){
            header('Location: register.php?errCode=2');
        }
        die($conn->error);
    }

    header("Location: index.php");
?>