// Get all icons inside the 'icons-container': 
const icons = document.querySelectorAll('#icons-container img');

// Loop through each icon and attach mouseenter and mouseleave event listeners: 
icons.forEach(icon => {
    // Store the original icon src: 
    const originalSrc = icon.src; 

    // Change the icon on mouseenter: 
    icon.addEventListener('mouseenter', () => {
        const hoverSrc = icon.getAttribute('data-hover');
        if (hoverSrc) {
            icon.src = hoverSrc; // Change to hover icon if it exists
        }
    });

    // Revert back to original icon on mouseleave: 
    icon.addEventListener('mouseleave', () => {
        icon.src = originalSrc; // Revert back to original icon
    });

})

// Function to update text content of 4th child element from "create-post-footer" parent element
function updateRevertButtonText() {

    // Select parent element
    const footer = document.getElementById('create-post-footer');

    // Select the 4th child element 
    const revertButton = footer.querySelectorAll('button')[3]; // Index 3 is the 4th element

    if (window.innerWidth < 768 ) {
        // Modify the text content
        revertButton.textContent = 'Revert';
    } else {
        // Revert to the original text for larger screens 
        revertButton.textContent = 'Revert new changes'
    }
}

// Call the function on page load
updateRevertButtonText();

// Call the function on window resize 
window.addEventListener('resize', updateRevertButtonText)


