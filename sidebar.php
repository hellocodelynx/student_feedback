<?php
session_start();
if (!isset($_SESSION['student_id'])) {
    header('Location: login.php');
    exit;
}
?>
<nav class="sidebar">
    <h2>Menu</h2>
    <ul>
        <li><a href="dashboard.php">Dashboard</a></li>
        <li><a href="feedback.php">Submit Feedback</a></li>
        <li><a href="history.php">Feedback History</a></li>
        <li><a href="profile.php">Profile</a></li>
        <li><a href="logout.php">Logout</a></li>
    </ul>
</nav>

