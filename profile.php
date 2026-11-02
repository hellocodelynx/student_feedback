<?php
session_start();
require_once 'config.php';
if (!isset($_SESSION['student_id'])) {
    header('Location: login.php');
    exit;
}

$student_id = $_SESSION['student_id'];
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $stmt = $pdo->prepare('UPDATE students SET name = ?, email = ? WHERE id = ?');
    $stmt->execute([$name, $email, $student_id]);
    $_SESSION['student_name'] = $name; // update session name
    $message = 'Profile updated successfully.';
}

// fetch current details
$stmt = $pdo->prepare('SELECT name, email, avatar FROM students WHERE id = ?');
$stmt->execute([$student_id]);
$student = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profile - Student Feedback</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <?php include 'sidebar.php'; ?>
    <main class="content" id="content">
        <h2>Profile</h2>
        <?php if ($message): ?>
            <p style="color:green;"><?=htmlspecialchars($message)?></p>
        <?php endif; ?>
        <form action="profile.php" method="POST">
            <label for="name">Name:</label><br/>
            <input type="text" id="name" name="name" value="<?=htmlspecialchars($student['name'])?>" required style="width:100%; margin-bottom:0.5rem;"/><br/>
            <label for="email">Email:</label><br/>
            <input type="email" id="email" name="email" value="<?=htmlspecialchars($student['email'])?>" required style="width:100%; margin-bottom:0.5rem;"/><br/>
            <!-- Avatar upload could be added later -->
            <button type="submit" class="btn btn-primary" style="width:100%;">Save Changes</button>
        </form>
    </main>
</body>
</html>

