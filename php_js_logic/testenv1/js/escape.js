import { setCookie } from "./cookieUtils/setCookie.js";
import { reloadAndDisable } from "./reload.js";

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const baseEscapeChance = 0.01; // Base escape chance (1%)
    let escapeCounter = 0; // Counter for escape opportunities

    // Escape status element
    const escapeStatusElement = document.getElementById('escapestatus');

    // Attack and Capture buttons
    const attackButton = document.getElementById('attack');
    const captureButton = document.getElementById('capture');

    // Function to calculate escape chance
    function calculateEscapeChance() {
        return (1 - 1 / (1 + baseEscapeChance * escapeCounter));
    }

    // Calculate initial escape chance and set first cookie
    let escapeChance = calculateEscapeChance();
    setCookie('escapeChance', escapeChance, 1);

    // Function to check for escape
    function checkForEscape() {
        escapeChance = calculateEscapeChance();
        const randomChance = Math.random();

        setCookie('escapeChance', escapeChance, 1)

        if (randomChance <= escapeChance) {
            escapeStatusElement.textContent = 'IT ESCAPED!';
            escapeStatusElement.style.color = 'red';
            reloadAndDisable();
        } else {
            escapeStatusElement.textContent = 'IT STAYED!';
            escapeStatusElement.style.color = 'green';
        }
    }

    // Function to increment escape counter and check for escape
    function handleEscapeOpportunity() {
        escapeCounter++; // Increment the escape counter
        checkForEscape(); // Check for escape
    }

    // Add event listeners to the buttons
    attackButton.addEventListener('click', handleEscapeOpportunity);
    captureButton.addEventListener('click', handleEscapeOpportunity);
});