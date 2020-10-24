<?php
    session_start();
    require_once('conn.php');

    if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])){
        header('Location: register.php?errCode=1');
        die();
    }

    $nickname = $_POST['nickname'];    
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 'regular';
    
    $sql = "INSERT INTO rexrexchian_w11_users(role, nickname, username, password) VALUES(?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $role, $nickname, $username, $password);
    $result = $stmt->execute();

    if(!$result){
        if(strpos($conn->error, "Duplicate entry") !== false){
            header('Location: register.php?errCode=2');
        }
        die($conn->error);
    }

    $_SESSION['username'] = $username;
    header("Location: index.php");
?>