import { getCookie } from "./cookieUtils/getCookie.js";
import { setCookie } from "./cookieUtils/setCookie.js";
import { reloadAndDisable } from "./reload.js";

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const chanceDef = 0.05; // Default capture chance (10%)
    const clampMax = 0.75; // Difference between max chance (80%) and default chance (10%)

    // Capture status element
    const captureStatusElement = document.getElementById('capturestatus');

    // Capture button
    const captureButton = document.getElementById('capture');

    // Current HP element
    const currentHPElement = document.getElementById('currenthp');

    // Variables
    let maxHP;
    let captureChance;

    // Function to calculate capture chance
    function calculateCaptureChance() {
        const currentHP = parseFloat(getCookie('currentHP'));
        captureChance = ((1 - (currentHP / maxHP)) * clampMax) + chanceDef;
        setCookie('captureChance', captureChance, 1)
    }

    calculateCaptureChance(); // Calculate initial capture chance

    // Function to handle capture attempt
    function attemptCapture() {
        const randomChance = Math.random(); // Generate a random number between 0 and 100
        if (randomChance <= captureChance) {
            captureStatusElement.textContent = 'IT WAS CAPTURED!';
            captureStatusElement.style.color = 'green';
            reloadAndDisable();
        } else {
            captureStatusElement.textContent = 'IT RESISTED!';
            captureStatusElement.style.color = 'red';
        }
    }

    // Observe changes to the #currenthp element
    const observer = new MutationObserver((mutationsList) => {
        maxHP = parseInt(getCookie('maxHP'));
        calculateCaptureChance(); // Recalculate capture chance
    });

    // Start observing the #currenthp element for changes
    observer.observe(currentHPElement, {
        childList: true, // Observe changes to child nodes
        characterData: true, // Observe changes to text content
        subtree: true // Observe all descendants
    });

    // Capture button click event
    captureButton.addEventListener('click', attemptCapture);
});