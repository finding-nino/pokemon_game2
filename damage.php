<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "db_pokemon";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

if (isset($_POST['pokemon_id'])) {
    $pokemon_id = intval($_GET['pokemon_id']);
    $damage = rand(1, 20);

    // Update-query zorgt ervoor dat levens niet onder 0 komt
    $stmt = $conn->prepare("UPDATE tb_pokemon SET Levens = GREATEST(Levens - ?, 0) WHERE id = ?");
    $stmt->bind_param("ii", $damage, $pokemon_id);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        header("Location: database.php");
        exit();
    } else {
        echo "Fout bij het bijwerken van de record: " . $conn->error;
    }
} else {
    echo "Geen Pokémon-ID ontvangen.";
}

$conn->close();
?>









</body>
</html>

