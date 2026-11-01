<?php
require_once 'config.php';
// Fetch all posts
$stmt = $pdo->query('SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC');
$posts = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Posts</title>
    <style>
        body {font-family:Arial,Helvetica,sans-serif; margin:20px;}
        .post {border-bottom:1px solid #ddd; padding:10px 0;}
        .post h3 {margin:0;}
        .post .date {color:#777; font-size:0.9em;}
    </style>
</head>
<body>
    <h2>Posts</h2>
    <?php if (empty($posts)): ?>
        <p>No posts yet.</p>
    <?php else: ?>
        <?php foreach ($posts as $p): ?>
            <div class="post">
                <h3><?=htmlspecialchars($p['title'])?></h3>
                <div class="date">Posted on <?=htmlspecialchars($p['created_at'])?></div>
                <p><?=nl2br(htmlspecialchars($p['body']))?></p>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>

