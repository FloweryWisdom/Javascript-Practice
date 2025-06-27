// This event listener ensures our script runs only after the HTML is ready
// All of our page-specific logic will go inside here.
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM ELEMENT SELECTIONS ---
    // Group all element selections here for clarity and easy reference.

    // Elements for the hover dropdown logic
    const trigger = document.getElementById('hover-trigger');
    const dropdown = document.getElementById('add-reactions-container-dropdown');

    // UI Interactivity Elements
    const iconButtons = document.querySelectorAll('.post-options');

    // Elements for the responsive company name and logic
    const promotedInfoCard = document.getElementById('card-3-promoted-company-info');

    // Elements to change classname based on screen size
    const postContainer = document.getElementById('post-content-section');
    const websiteLogoIcon = document.getElementById('website-logo');
    const profileDropdownButton = document.getElementById('profileDropdown');
    const searchContainer = document.getElementById('search-container');
    const createPostButton = document.getElementById('create-post-button');
    const postAuthorContainer = document.getElementById('post-author-info');

    // --- 2. FUNCTION DEFINITIONS ---
    // Define all your helper functions in this section.

    // Function to update the company name text based on window size
    function updatePromotedCompanyName() {
        // A defensive check: if the main card element wasn't found, stop to prevent errors.
        if (!promotedInfoCard) return;

        // This selector is a bit "brittle" as it relies on order.
        // A better long term solution would be to give the <p> tag its own unique ID.
        const promotedCompanyName = promotedInfoCard.querySelector('p'); // Selects the first <p> inside the card

        // This check ensures we don't get an error if the <p> tag is ever removed.
        if (promotedCompanyName) {
            if (window.innerWidth < 1400) {
                promotedCompanyName.textContent = 'Dev';
            } else {
                promotedCompanyName.textContent = 'The Dev Team';
            }
        }
    }

    // Function to resize width of elements based on screen size
    function updateClassBasedOnWidth() {
        // Defensive check
        if (!postContainer || !websiteLogoIcon || !profileDropdownButton || !searchContainer || !createPostButton || !postAuthorContainer ) return;

        const width = window.innerWidth;
        
        // Reset column classes
        postContainer.classList.remove('col-12', 'col-11', 'col-8');

        if(width < 768) {
            postContainer.classList.add('col-12');
            searchContainer.classList.add('d-none');
            searchContainer.classList.remove('d-flex');
            createPostButton.classList.add('ms-auto');
            postAuthorContainer.classList.add('mb-4');
            postAuthorContainer.classList.remove('mb-5');
        } else if (width < 1023) {
            postContainer.classList.add('col-11');
            searchContainer.classList.add('d-flex');
            searchContainer.classList.remove('d-none');
            createPostButton.classList.remove('ms-auto');
            postAuthorContainer.classList.add('mb-5');
            postAuthorContainer.classLlist.remove('mb-4');
            websiteLogoIcon.classList.add('ms-2');
            websiteLogoIcon.classList.remove('ms-5');
            profileDropdownButton.classList.add('me-2');
            profileDropdownButton.classList.remove('me-5');
        } else {
            postContainer.classList.add('col-8');
            searchContainer.classList.add('d-flex');
            searchContainer.classList.remove('d-none');
            createPostButton.classList.remove('ms-auto');
            postAuthorContainer.classList.add('mb-5');
            postAuthorContainer.classList.remove('mb-4');
            websiteLogoIcon.classList.add('ms-5');
            websiteLogoIcon.classList.remove('ms-2');
            profileDropdownButton.classList.add('me-5');
            profileDropdownButton.classList.remove('me-2');
        }
        
    }

    // --- 3. EVENT LISTENER ATTACHMENTS ---
    // Attach all the event listeners your page needs.

    // --- A) Dropdown Hover Logic ---
    let hideTimer; // Timer for the dropdown


    // When the mouse enters the main trigger element
    if (trigger) {
        trigger.addEventListener('mouseenter', () => {
            // If there's a pending timer to hide the dropdown, cancel it
            clearTimeout(hideTimer);
            // Immediately show the dropdown.
            if (dropdown) dropdown.style.display = 'flex';
        });

        // When the mouse leaves the main trigger element
        trigger.addEventListener('mouseleave', () => {
            // Start a short timer. After 200ms, the dropdown will hide.
            // This 200ms is the "grace period" for the user to move their mouse.
            hideTimer = setTimeout(() => {
                if (dropdown) dropdown.style.display = 'none';
            }, 200); // Adjust delay as needed
        });
    }

    // Now, handle event on the dropdown menu itself
    if (dropdown) {
        // When the mouse successfully enters the dropdown menu
        dropdown.addEventListener('mouseenter', () => {
            // The user made it! Cancel the timer that was trying to hide the dropdown.
            // This is the key piece of logic that keeps the menu open.
            clearTimeout(hideTimer);
        });

        // When the mouse leaves the dropdown menu itself
        dropdown.addEventListener('mouseleave', () => {
            // The user is no longer interested, so hide the dropdown immediately.
            dropdown.style.display = 'none';
        });
    }

    
    // --- B) Responsive Text Logic ---
    // This listener calls your function every time the browser window is resized.
    window.addEventListener('resize', updatePromotedCompanyName);


    // --- C) UI Interactivity Listeners ---

    // Make sure we found some buttons before tyring to loop
    if (iconButtons.length > 0) {
        // Loop through each button to attach the event listeners individually
        iconButtons.forEach(button => {
            // Find the specific image tag INSIDE this button
            const icon = button.querySelector('img');

            // Defensive check: If a button in this class doesn't have an image, skip it.
            if (!icon) {
                return;
            }

            // Store the original source for this specific icon
            const originalSrc = icon.src;

            // Attach the 'mouseenter' listener to the BUTTON
            button.addEventListener('mouseenter', () => {
                // Get the hover source from the data-hover attribute of the icon inside
                const hoverSrc = icon.getAttribute('data-hover');
                if (hoverSrc) {
                    icon.src = hoverSrc; // Change the image source
                }
            });
            // Attach the 'mouseleave' listener to the BUTTON
            button.addEventListener('mouseleave', () => {
                // Revert the image source back to the original
                icon.src = originalSrc;
            });
        });
    }

    // D) --- Responsive Element Resizing ---
    // This listener calls your functions every time the browser window is resized.
    window.addEventListener('resize', updateClassBasedOnWidth);



    // --- 4. INITIAL CALLS ON PAGE LOAD ---
    // Run any functions that need to execute once as soon as the page is ready.

    // Call this function once to set the correct initial text for the company name.
    updatePromotedCompanyName();

    // Call this function once to set the correct element sized based on screen size.
    updateClassBasedOnWidth();

    // The logic to fetch the specific post data will also be called here.
    // e.g., fetchAndDisplaySinglePost();
});




// THE BEST PRACTICE: ORGANIZE BY PURPOSE

// 1. AUTH GUARD
// 2. DOM ELEMENT SELECTION
// 3. FUNCTION DEFINITIONS
// 4. EVENT LISTENER ATTACHMENTS
// 5. INITIAL FUNCTION CALLS
