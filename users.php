<?php
require_once 'config.php';
$stmt = $pdo->query('SELECT id, username, email, registered_at FROM users ORDER BY registered_at DESC');
$users = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Users</title>
    <style>
        body {font-family:Arial,Helvetica,sans-serif; margin:20px;}
        table {border-collapse:collapse; width:100%;}
        th, td {border:1px solid #ddd; padding:8px;}
        th {background:#f2f2f2;}
    </style>
</head>
<body>
    <h2>Users</h2>
    <?php if (empty($users)): ?>
        <p>No users found.</p>
    <?php else: ?>
        <table>
            <tr><th>ID</th><th>Username</th><th>Email</th><th>Registered</th></tr>
            <?php foreach ($users as $u): ?>
                <tr>
                    <td><?=htmlspecialchars($u['id'])?></td>
                    <td><?=htmlspecialchars($u['username'])?></td>
                    <td><?=htmlspecialchars($u['email'])?></td>
                    <td><?=htmlspecialchars($u['registered_at'])?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>
</body>
</html>

