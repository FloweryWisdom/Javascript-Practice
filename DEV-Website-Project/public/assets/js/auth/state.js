// This function will be called as soon as the HTML document structure is ready.
// It's the central place to manage our UI based on whether a user is logged in. 
function updateUserAuthState() {

    // --- 1. Select all the navbar elements we need to control ---
    // Guest Buttons
    const loginButton = document.getElementById('login-button');
    const createAccountButton = document.getElementById('create-account-button');

    // Logged-in User Buttons/Elements
    const createPostButton = document.getElementById('create-post-button');
    const profileDropdownContainer = document.getElementById('profile-dropdown-container'); // The whole dropdown div
    const logoutLink = document.getElementById('logout-link'); // The "Sign Out" link inside the dropdown

    // --- 2. Check for the authentication token in localStorage ---
    // localStorage is browser storage that persists even after the browser is closed. 
    // We stored our JWT here after a successful login/signup.
    const token = localStorage.getItem('authToken');

    // --- 3. Update UI based on whether the token exists ---
    if (token) {
        // --- USER IS LOGGED IN ---

        // Hide the buttons for guests
        if (loginButton) loginButton.style.display = 'none';
        if (createAccountButton) createAccountButton.style.display = 'none';

        // Show the buttons and elements for logged-in users
        if (createPostButton) createPostButton.style.display = 'block';
        if (profileDropdownContainer) profileDropdownContainer.style.display = 'block';

    } else {
        // --- USER IS NOT LOGGED IN (GUEST) ---

        // Show the buttons for guests
        if (loginButton) loginButton.style.display = 'block'; 
        if (createAccountButton) createAccountButton.style.display = 'block';

        // Hide the butons and elements for logged-in users
        if (createPostButton) createPostButton.style.display = 'none';
        if (profileDropdownContainer) profileDropdownContainer.style.display = 'none';
    }

    // --- 4. Add Logout Functionality --- 
    // We only need to add this listener is the logout link is actually on the page
    // (which it will be if the user is logged in)
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            // Prevent the link's default behavior of trying to navigate to '#'
            event.preventDefault();

            // Clear the token from localStorage - this effectively logs the user out
            localStorage.removeItem('authToken');

            // Give user feedback
            alert('You have been successfully logged out.');

            // Redirect the user to the homepage
            window.location.href = '/index.html';
        });
    }
}

// --- Execute the function after the DOM is fully loaded ---
// This ensurs all HTML elements are available to be selected by getElementById.
document.addEventListener('DOMContentLoaded', updateUserAuthState);