<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
 

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


$sql = "SELECT Naam, Afbeelding, Levens FROM tb_pokemon";
$result = $conn->query($sql);



if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>Naam</th><th>Afbeelding</th><th>Levens</th></tr>";

    
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['Naam']) . "</td>";
        echo "<td>" . htmlspecialchars($row['Afbeelding']) . "</td>";
        echo "<td>" . htmlspecialchars($row['Levens']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else { //Foutmelding als er geen berichten aanwezig zijn
    echo "<p style='text-align: center;'>Niks gevonden in de database.</p>";
}


$conn->close();
?>

</body>
</html>
