document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const barWidth = 190; // Max width of the health bar in pixels
    const damageAmount = 10; // Flat damage amount per attack

    // Health bar element
    const healthBar = document.getElementById('healthbar');

    // Attack button
    const attackButton = document.getElementById('attack');

    // Current HP element
    const currentHPElement = document.getElementById('currenthp');

    // Function to initialize health bar functionality
    function initializeHealthBar() {
        let maxHP = parseInt(document.getElementById('maxhp').textContent.split(' ')[2]); // Get maxHP from the populated HP element
        let currentHP = maxHP; // Initialize currentHP to maxHP

        // Function to update the health bar width
        function updateHealthBar() {
            const newWidth = barWidth * (currentHP / maxHP); // Calculate new width
            healthBar.style.width = `${newWidth}px`; // Update health bar width

            currentHPElement.textContent = `| CURRENT HP: ${currentHP}`;

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
            if (currentHP > 0) {
                currentHP -= damageAmount; // Decrement currentHP
                if (currentHP < 0) currentHP = 0; // Ensure HP doesn't go below 0
                updateHealthBar(); // Update the health bar
            }
        });

        // Initialize health bar on page load
        updateHealthBar();
    }

    // Observe changes to the #hp element
    const hpElement = document.getElementById('maxhp');
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                // Check if the textContent now contains a valid HP value
                if (hpElement.textContent.includes('MAX HP: ') && !isNaN(parseInt(hpElement.textContent.split(' ')[2]))) {
                    initializeHealthBar(); // Initialize health bar functionality
                    observer.disconnect(); // Stop observing once the HP value is set
                }
            }
        }
    });

    // Start observing the #hp element for changes
    observer.observe(hpElement, {
        childList: true, // Observe changes to child nodes
        characterData: true, // Observe changes to text content
        subtree: true // Observe all descendants
    });
});