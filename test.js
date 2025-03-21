document.addEventListener("DOMContentLoaded", function() {
    fetch('db_json_encode.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error); // Log error if no data is found
        } else {
            document.getElementById('Naam').textContent = "Naam: " + data.Naam;
            document.getElementById('Levens').textContent = "Levens: " + data.Levens;
            console.log(data.Afbeelding); // Debugging: Check the value of data.Afbeelding

            let gifElement = document.getElementById('gif-container');
            if (data.Afbeelding) {
                // Use data.Afbeelding directly (it already includes the full path)
                gifElement.innerHTML = `<img src="${data.Afbeelding}" alt="GIF">`;
            } else {
                gifElement.textContent = "Geen afbeelding beschikbaar";
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});