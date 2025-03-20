document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const chanceDef = 10; // Default capture chance (10%)
    const clampMax = 70; // Difference between max chance (80%) and default chance (10%)

    // Capture status element
    const captureStatusElement = document.getElementById('capturestatus');

    // Capture button
    const captureButton = document.getElementById('capture');

    // Current HP element
    const currentHPElement = document.getElementById('currenthp');

    // Current HP element
    const maxHPElement = document.getElementById('maxhp');

    // Variables
    let maxHP
    let captureChance;

    // Function to calculate capture chance
    function calculateCaptureChance() {
        const currentHP = parseFloat(currentHPElement.textContent.split(':')[1].trim());
        captureChance = ((1 - (currentHP / maxHP)) * clampMax) + chanceDef;
    }

    calculateCaptureChance(); // Calculate initial capture chance

    // Function to handle capture attempt
    function attemptCapture() {
        const randomChance = Math.random() * 100; // Generate a random number between 0 and 100
        if (randomChance <= captureChance) {
            captureStatusElement.textContent = 'IT WAS CAPTURED!';
            captureStatusElement.style.color = 'green';
        } else {
            captureStatusElement.textContent = 'IT RESISTED!';
            captureStatusElement.style.color = 'red';
        }
    }

    // Observe changes to the #currenthp element
    const observerHPCurrent = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                // Check if the textContent now contains a valid HP value
                if (currentHPElement.textContent.includes('CURRENT HP: ') && !isNaN(parseFloat(currentHPElement.textContent.split(':')[1].trim()))) {
                    calculateCaptureChance(); // Recalculate capture chance
                }
            }
        }
    });

    // Start observing the #currenthp element for changes
    observerHPCurrent.observe(currentHPElement, {
        childList: true, // Observe changes to child nodes
        characterData: true, // Observe changes to text content
        subtree: true // Observe all descendants
    });

    const observerHPMax = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                // Check if the textContent now contains a valid HP value
                if (maxHPElement.textContent.includes('MAX HP: ') && !isNaN(parseInt(maxHPElement.textContent.split(' ')[2]))) {
                    maxHP = parseInt(document.getElementById('maxhp').textContent.split(' ')[2]); // Get maxHP from the populated HP element
                    observerHPMax.disconnect(); // Stop observing once the HP value is set
                }
            }
        }
    });

    // Start observing the #hp element for changes
    observerHPMax.observe(maxHPElement, {
        childList: true, // Observe changes to child nodes
        characterData: true, // Observe changes to text content
        subtree: true // Observe all descendants
    });

    // Capture button click event
    captureButton.addEventListener('click', attemptCapture);
});