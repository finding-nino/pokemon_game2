import { setCookie } from './cookieUtils/setCookie.js';

fetch('php/db.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error); // Log error if no data is found
        } else {
            // Update the HP and ID in the HTML
            document.getElementById('maxhp').textContent = 'MAX HP: ' + data.hp;
            document.getElementById('id').textContent = '| ID: ' + data.id;
            
            setCookie('maxHP', data.hp, 1);
            setCookie('entityID', data.id, 1);
        }
    })
    .catch(error => console.error('Error fetching data:', error));