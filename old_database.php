<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="dbstyles.css">
    <title>Document</title>
 
<button id= "attack_button">Aanvallen</button>


</head>

<script>
document.addEventListener("DOMContentLoaded", function() {
    let imgCells = document.querySelectorAll("td[data-img]"); // Alle cellen met een data-img attribuut zoeken
    
    imgCells.forEach(cell => {
        let imgSrc = cell.getAttribute("data-img"); // Afbeeldingen ophalen
        let imgTag = cell.querySelector(".pokemon-img"); // Selecteer de img-tag 
        
        if (imgSrc) {
            imgTag.src = imgSrc; // Zet de afbeelding als bron
        } else {
            imgTag.alt = "Geen afbeelding beschikbaar"; // Fallback als er geen afbeelding is
        }
    });
});



let attack_button = document.getElementById('attack_button');

attack_button.addEventListener('click', function(){
    console.log('Aanval');
})

let pokemonHP = 100;

let pkmn_attack = Math.floor((Math.random() * 26 + 5));

let newHP = pokemonHP -= pkmn_attack;




</script>

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

$sql = "SELECT * FROM tb_pokemon ORDER BY RAND() LIMIT 0,1;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $maxHP = (int) $row['Levens'] ?? 100; // Max HP uit database, standaard 100 als fallback
        $currentHP = (int) $row['Levens']; // Huidige HP uit database
        $hpPercentage = max(0, min(($currentHP / $maxHP) * 100, 100)); // Zorg dat het tussen 0 en 100 blijft

        // Bepaal kleur op basis van HP-percentage
        if ($hpPercentage > 50) {
            $hpColor = "green";
        } elseif ($hpPercentage > 20) {
            $hpColor = "orange";
        } else {
            $hpColor = "red";
        }


        if ($currentHP === $maxHP) {
        $hpColor = "green"; // Zorg dat het altijd groen is bij volle HP
        $hpPercentage = 100; // Healthbar is volledig gevuld
        }
        
        $imagePath = "images/" . htmlspecialchars($row['Afbeelding']);
        echo "<div class='pokemon-container'>";
        echo "<h2>" . htmlspecialchars($row['Naam']) . "</h2>"; // Naam boven de afbeelding
        echo "<img src='$imagePath' alt='Pokémon afbeelding' class='pokemon-img'>";

          // Healthbar
          echo "<div class='healthbar-container'>";
          echo "<div class='healthbar' style='width: {$hpPercentage}%; background-color: {$hpColor};'></div>";
          echo "</div>";       
       
    }
}




$conn->close();
?>
</body>
</html>