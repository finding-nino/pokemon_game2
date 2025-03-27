import { getCookie } from './cookieUtils/getCookie.js';
import { setCookie } from './cookieUtils/setCookie.js';

fetch('php/db_json_encode.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error); // Log error if no data is found
        } else {
            setCookie('maxHP', data.Levens, 1);
            setCookie('entityID', data.id, 1);
            setCookie('captureAmount', data.Gevangen, 1);
            
            document.getElementById('entityName').textContent = data.Naam + ": " + getCookie('captureAmount');
            
            let gifElement = document.getElementById('entityVisual');
            if (data.Afbeelding) {
                gifElement.src = "images/" + data.Afbeelding;
            } else {
                gifElement.alt = "Geen afbeelding beschikbaar";
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));