<?php
session_start();
require_once 'config.php';
if (!isset($_SESSION['student_id'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - Student Feedback</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <?php include 'sidebar.php'; ?>
    <main class="content" id="content">
        <h2>Welcome, <?=htmlspecialchars($_SESSION['student_name'])?>!</h2>
        <p>This is your dashboard. Use the menu on the left to submit feedback, view your history, or edit your profile.</p>
    </main>
</body>
</html>

