<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$username = 'root';
$password = 'password';
$database = 'db_pokemon';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

$sql = "SELECT * FROM tb_pokemon";
$result = $conn->query($sql);


$pokemonData = [];

if (mysqli_num_rows($result) == 0) {
    echo "nada noppes"; // No data found
} else {
    // Fetch all rows and store them in $pokemonData
    while ($row = $result->fetch_assoc()) {
        $pokemonData[] = $row; // Append each row to the array
    }
}

// Output the data (for debugging)
#print_r($pokemonData);


$showmon = $pokemonData[array_rand($pokemonData)];

header('Content-Type: application/json');
echo json_encode($showmon);

$conn->close();


?>



