<?php
session_start();
require_once 'config.php';
if (!isset($_SESSION['student_id'])) {
    header('Location: login.php');
    exit;
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $teacher_id = $_POST['teacher_id'] ?? null;
    $rating = $_POST['rating'] ?? null;
    $comments = $_POST['comments'] ?? '';
    $student_id = $_SESSION['student_id'];

    if ($teacher_id && $rating) {
        $stmt = $pdo->prepare('INSERT INTO feedback (student_id, teacher_id, rating, comments) VALUES (?,?,?,?)');
        $stmt->execute([$student_id, $teacher_id, $rating, $comments]);
        $success = 'Feedback submitted successfully.';
    } else {
        $error = 'Please select a teacher and a rating.';
    }
}

// Fetch teachers for the dropdown
$teachersStmt = $pdo->query('SELECT id, name, department FROM teachers ORDER BY name');
$teachers = $teachersStmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Submit Feedback</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <?php include 'sidebar.php'; ?>
    <main class="content" id="content">
        <h2>Submit Feedback</h2>
        <?php if (!empty($error)): ?>
            <p style="color:red;"><?=htmlspecialchars($error)?></p>
        <?php elseif (!empty($success)): ?>
            <p style="color:green;"><?=htmlspecialchars($success)?></p>
        <?php endif; ?>
        <form action="feedback.php" method="POST">
            <label for="teacher_id">Teacher:</label><br/>
            <select name="teacher_id" id="teacher_id" required style="width:100%; margin-bottom:0.5rem;">
                <option value="">-- Choose a teacher --</option>
                <?php foreach ($teachers as $t): ?>
                    <option value="<?=htmlspecialchars($t['id'])?>">
                        <?=htmlspecialchars($t['name'])?> (<?=htmlspecialchars($t['department'])?>)
                    </option>
                <?php endforeach; ?>
            </select><br/>
            <label for="rating">Rating (1‑5):</label><br/>
            <select name="rating" id="rating" required style="width:100%; margin-bottom:0.5rem;">
                <option value="">-- Select rating --</option>
                <?php for ($i = 1; $i <= 5; $i++): ?>
                    <option value="<?= $i ?>"><?= $i ?></option>
                <?php endfor; ?>
            </select><br/>
            <label for="comments">Comments (optional):</label><br/>
            <textarea name="comments" id="comments" rows="4" style="width:100%; margin-bottom:0.5rem;"></textarea><br/>
            <button type="submit" class="btn btn-primary" style="width:100%;">Submit</button>
        </form>
    </main>
</body>
</html>

