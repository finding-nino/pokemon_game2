<?php
header("Content-Type: application/json");

// Database configuration
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "db_pokemon";

// Get the posted data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!isset($data['id']) || !isset($data['counter'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

$id = $data['id'];
$counter = $data['counter'];

try {
    // Create connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("UPDATE tb_pokemon SET Gevangen = :counter WHERE id = :id");
    $stmt->bindParam(':counter', $counter);
    $stmt->bindParam(':id', $id);

    // Execute the query
    $stmt->execute();

    // Check if any row was actually updated
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Counter updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No record found with that ID']);
    }
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

$conn = null;
?>