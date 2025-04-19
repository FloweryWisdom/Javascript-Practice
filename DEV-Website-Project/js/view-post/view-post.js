// Function to update text content of the name of the company in the promoted section on the third card on the right sidebar
function updatePromotedCompanyName() {

    // Select parent element
    const card3 = document.getElementById('card-3-promoted-company-info');

    // Select the 4th child element 
    const promotedCompanyName = card3.querySelectorAll('p')[0]; // Index 0 is the 1st element

    if (window.innerWidth < 1300 ) {
        // Modify the text content
        promotedCompanyName.textContent = 'Dev';
    } else {
        // Revert to the original text for larger screens 
        promotedCompanyName.textContent = 'The Dev Team'
    }
}

// Call the function on page load
updatePromotedCompanyName();

// Call the function on window resize 
window.addEventListener('resize', updatePromotedCompanyName)
