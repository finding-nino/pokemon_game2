import { setCookie } from './cookieUtils/setCookie.js';
import { getCookie } from './cookieUtils/getCookie.js';
import { reloadAndDisable } from './reload.js';

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const barWidth = 502; // Max width of the health bar in pixels
    let damageAmount;

    // Health bar element
    const healthBar = document.getElementById('entityHealthbar');
    
    // Max HP element
    const maxHPElement = document.getElementById('maxHP');
    
    // Current HP element
    const currentHPElement = document.getElementById('currentHP');

    // Attack button
    const attackButton = document.getElementById('damageEntity');

    const entityStatusElement = document.getElementById('entityStatusInsertionPoint');

    // Function to initialize health bar functionality
    function initializeHealthBar() {
        let maxHP = getCookie('maxHP');
        let currentHP = maxHP; // Initialize currentHP to maxHP
        setCookie('currentHP', currentHP, 1);

        // Function to update the health bar width
        function updateHealthBar() {
            const newWidth = barWidth * (currentHP / maxHP); // Calculate new width
            healthBar.style.width = `${newWidth}px`; // Update health bar width
            if (currentHP > 0) {
                maxHPElement.textContent = `${maxHP}`;
                currentHPElement.textContent = `${currentHP}`;
            }

            // Change color based on health percentage  
            if (newWidth <= barWidth * 0.25) {
                healthBar.style.backgroundColor = 'red'; // Low health
            } else if (newWidth <= barWidth * 0.5) {
                healthBar.style.backgroundColor = 'orange'; // Medium health
            } else {
                healthBar.style.backgroundColor = 'green'; // High health
            }
        }

        // Attack button click event
        attackButton.addEventListener('click', () => {
            damageAmount = Math.floor(Math.random() * (20 - 5) + 5); // Random damage between 5 and 20
            if (currentHP > 0) {
                currentHP -= damageAmount; // Decrement currentHP
                if (currentHP <= 0) {
                    currentHP = 0;
                    entityStatusElement.textContent = 'It fainted!';
                    maxHPElement.textContent = '';
                    currentHPElement.textContent = '';
                    healthBar.style.width = '0px';
                    reloadAndDisable();
                } // Ensure HP doesn't go below 0
                setCookie('currentHP', currentHP, 1);
                updateHealthBar(); // Update the health bar
            }
        });

        // Initialize health bar on page load
        updateHealthBar();
    }
    initializeHealthBar();
});