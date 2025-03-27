import { getCookie } from "./cookieUtils/getCookie.js";
import { setCookie } from "./cookieUtils/setCookie.js";
import { reloadAndDisable } from "./reload.js";

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const chanceDef = 0.05; // Default capture chance (10%)
    const clampMax = 0.75; // Difference between max chance (80%) and default chance (10%)
    const barHeight = 349;

    // Capture status element
    const entityStatusElement = document.getElementById('entityStatusInsertionPoint');

    // Capture button
    const captureButton = document.getElementById('captureEntity');
    const healthBar = document.getElementById('entityHealthbar');

    // Max HP element
    const maxHPElement = document.getElementById('maxHP');
    
    // Current HP element
    const currentHPElement = document.getElementById('currentHP');

    const captureBar = document.getElementById("captureBar");

    const attackButton = document.getElementById("damageEntity")

    

    // Variables
    let maxHP;
    let captureChance;
    let captureAmount = parseInt(getCookie('captureAmount'));

    // Function to calculate capture chance
    function calculateCaptureChance() {
        const currentHP = parseFloat(getCookie('currentHP'));
        captureChance = ((1 - (currentHP / maxHP)) * clampMax) + chanceDef;
        setCookie('captureChance', captureChance, 1);
    }

    setCookie('captureChance', chanceDef, 1);

    // This function sends your counter to the PHP backend
    function updateCounterInDatabase() {
        // Create an object with your data
        const data = {
            id: getCookie('entityID'),
            counter: captureAmount
        };

        // Send the data to your PHP script using fetch API
        fetch('./php/db_update_counter.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Function to handle capture attempt
    function attemptCapture() {
        const randomChance = Math.random(); // Generate a random number between 0 and 100
        if (randomChance <= captureChance) {
            captureAmount += 1;
            entityStatusElement.textContent = 'You captured it!';
            maxHPElement.textContent = '';
            currentHPElement.textContent = '';
            healthBar.style.width = '0px';
            reloadAndDisable();
            updateCounterInDatabase(123, 42); // Updates record with ID 123 to counter value 42
        }
    }

    // Observe changes to the #currenthp element
    const observer = new MutationObserver((mutationsList) => {
        maxHP = parseInt(getCookie('maxHP'));
        calculateCaptureChance(); // Recalculate capture chance
    });

    // Start observing the #currenthp element for changes
    observer.observe(healthBar, {
        childList: true, // Observe changes to child nodes
        characterData: true, // Observe changes to text content
        subtree: true // Observe all descendants
    });

    // Capture button click event
    captureButton.addEventListener('click', attemptCapture);


    // Function to initialize health bar functionality
    function initializeCaptureBar() {
        let captureChance = getCookie('captureChance');



        // Function to update the health bar width
        function updateCaptureBar() {
            let newBarHeigth = captureChance * barHeight;
            captureBar.style.height = `${newBarHeigth}px`; // Update capture bar


            // Change color based on health percentage  
            if (newBarHeigth <= barHeight * 0.35) {
                captureBar.style.backgroundColor = 'red'; // Low health
            } else if (newBarHeigth <= barHeight * 0.65) {
                captureBar.style.backgroundColor = 'orange'; // Medium health
            } else {
                captureBar.style.backgroundColor = 'green'; // High health
            }
        }


        // Initialize health bar on page load
        updateCaptureBar();
    }
    initializeCaptureBar();

    // Attack button click event
    attackButton.addEventListener('click', () => {
        initializeCaptureBar(); // Update the health bar
    });
});