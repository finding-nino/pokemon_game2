import { setCookie } from "./cookieUtils/setCookie.js";
import { getCookie } from "./cookieUtils/getCookie.js";
import { reloadAndDisable } from "./reload.js";

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const baseEscapeChance = 0.01; // Base escape chance (1%)
    let escapeCounter = 0; // Counter for escape opportunities
    const barHeight = 349;

    // Escape status element
    const entityStatusElement = document.getElementById('entityStatusInsertionPoint');

    // Health bar element
    const healthBar = document.getElementById('entityHealthbar');
    
    // Max HP element
    const maxHPElement = document.getElementById('maxHP');
        
    // Current HP element
    const currentHPElement = document.getElementById('currentHP');


    // Attack and Capture buttons
    const attackButton = document.getElementById('damageEntity');
    const captureButton = document.getElementById('captureEntity');

    const escapeBar = document.getElementById("escapeBar")

    // Function to calculate escape chance
    function calculateEscapeChance() {
        return (1 - 1 / (1 + baseEscapeChance * escapeCounter));
    }

    // Calculate initial escape chance and set first cookie
    let escapeChance = calculateEscapeChance();
    setCookie('escapeChance', escapeChance, 1);

    // Function to check for escape
    function checkForEscape(bShouldCheck) {
        if (bShouldCheck == 1) {
            escapeChance = calculateEscapeChance();
        }
        const randomChance = Math.random();

        setCookie('escapeChance', escapeChance, 1)

        if (randomChance <= escapeChance) {
            entityStatusElement.textContent = 'It escaped!';
            maxHPElement.textContent = '';
            currentHPElement.textContent = '';
            healthBar.style.width = '0px';
            reloadAndDisable();
        }
    }

    // Function to increment escape counter and check for escape
    function handleEscapeOpportunity() {
        escapeCounter++; // Increment the escape counter
        checkForEscape(1); // Check for escape
    }

    // Function to initialize health bar functionality
    function initializeEscapeBar() {
        let escapeChance = Math.min(getCookie('escapeChance') * 7, barHeight); // Ensure escapeChance doesn't exceed 1

        // Function to update the health bar width
        function updateEscapeBar() {
            // Calculate new height, but don't exceed barHeight
            let newBarHeight = Math.min(escapeChance * barHeight, barHeight);
            escapeBar.style.height = `${newBarHeight}px`; // Update escape bar

            if (newBarHeight == barHeight) {
                entityStatusElement.textContent = 'It escaped!';
                maxHPElement.textContent = '';
                currentHPElement.textContent = '';
                healthBar.style.width = '0px';
                reloadAndDisable();
            }

            // Change color based on health percentage  
            if (newBarHeight <= barHeight * 0.35) {
                escapeBar.style.backgroundColor = 'green'; // Low health
            } else if (newBarHeight <= barHeight * 0.65) {
                escapeBar.style.backgroundColor = 'orange'; // Medium health
            } else {
                escapeBar.style.backgroundColor = 'red'; // High health
            }
        }

        // Initialize health bar on page load
        updateEscapeBar();
    }
    initializeEscapeBar();


    // Add event listeners to the buttons
    attackButton.addEventListener('click', function() {
        handleEscapeOpportunity();
        initializeEscapeBar();
    });
    captureButton.addEventListener('click', function() {
        handleEscapeOpportunity();
        initializeEscapeBar();
    });

     

    
});