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