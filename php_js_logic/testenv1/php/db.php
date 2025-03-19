<?php
$host = 'localhost';
$user = 'root';
$pass = 'password';
$dbname = 'db_pokemon';
$tbname = 'tb_pokemon';

try {
    $conn = new PDO("mysql:host=$host;port=3306;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$sql = "SELECT id, Levens FROM $tbname";
$stmt = $conn->query($sql);

// Fetch all the rows as an associative array
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Randomly select one entry from the fetched rows
if (!empty($rows)) {
    $randomEntry = $rows[array_rand($rows)]; // Randomly select one row
    header('Content-Type: application/json');
    echo json_encode($randomEntry); // Return the selected row as JSON
} else {
    echo json_encode(["error" => "No data found in the table."]);
}
?>