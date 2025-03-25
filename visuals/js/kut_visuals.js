document.addEventListener("DOMContentLoaded", function() {
    fetch('php/db_json_encode.php')
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        if (data.error) {
            console.error(data.error);
        } else {
            document.getElementById('entityName').textContent = data.Naam;
            
            
            let gifElement = document.getElementById('entityVisual');
            if (data.Afbeelding) {
                gifElement.src = data.Afbeelding;
            } else {
                gifElement.alt = "Geen afbeelding beschikbaar";
            }
        }
     })
    .catch(error => console.error('Error fetching data:', error));
});