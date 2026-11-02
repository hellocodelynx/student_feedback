<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT id, password, name FROM students WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $user['password'] === md5($password)) { // using MD5 for demo data
        $_SESSION['student_id'] = $user['id'];
        $_SESSION['student_name'] = $user['name'];
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid email or password';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login – Student Feedback</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="container" style="max-width:400px;margin:auto;">
        <h2>Student Login</h2>
        <?php if (!empty($error)): ?>
            <p style="color:red;"><?=htmlspecialchars($error)?></p>
        <?php endif; ?>
        <form action="login.php" method="POST">
            <label for="email">Email:</label><br/>
            <input type="email" id="email" name="email" required style="width:100%;"><br/><br/>
            <label for="password">Password:</label><br/>
            <input type="password" id="password" name="password" required style="width:100%;"><br/><br/>
            <button type="submit" class="btn btn-primary" style="width:100%;">Login</button>
        </form>
        <p style="margin-top:1rem;">Demo accounts:<br/>alice@example.com / alice123<br/>bob@example.com / bob123</p>
    </div>
</body>
</html>

