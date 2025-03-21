<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "db_pokemon";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the database
$sql = "SELECT Naam, Levens, Afbeelding FROM tb_pokemon";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Prepend the path to the Afbeelding field
    $row['Afbeelding'] = '/images/' . $row['Afbeelding'];

    // Send the JSON response
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'No data found']);
}

$conn->close();
?>