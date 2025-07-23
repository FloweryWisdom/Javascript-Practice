
// This event listener ensures all our scripts run only after the html document
// has been loaded and parsed. This is the main container for all global UI logic.
document.addEventListener('DOMContentLoaded', () => {
    // -- 1. DOM ELEMENT SELECTIONS (for all features in this file) ---

    // Auth State Elements:

    // Guest Buttons
    const loginButton = document.getElementById('login-button');
    const createAccountButton = document.getElementById('create-account-button');
    // Logged-in User Buttons/Elements
    const createPostButton = document.getElementById('create-post-button');
    const profileDropdownContainer = document.getElementById('profile-dropdown-container'); // The whole dropdown div
    const logoutLink = document.getElementById('logout-link'); // The "Sign Out" link inside the dropdown


    // Live Search Elements:
    const searchForm = document.getElementById('search-container');
    const searchInput = document.getElementById('search-box');
    const searchResultsDropdown = document.getElementById('search-results-dropdown');


    // --- 2. AUTHENTICATION STATE & UI UPDATES ---

    // localStorage is browser storage that persists even after the browser is closed.
    // We stored our JWT here after a successful login/signup.
    
    const token = localStorage.getItem('authToken');

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

        // Hide the buttons and elements for logged-in users
        if (createPostButton) createPostButton.style.display = 'none';
        if (profileDropdownContainer) profileDropdownContainer.style.display = 'none';
    }

    // Add Logout Functionality
    // We only need to add this listener if the logout link is actually on the page
    // (which it will be if the user is logged in)
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            // Prevent the link's default behavior of trying to navigate to '#'
            event.preventDefault();
            // Clear the token from localStorage - this effectively logs the user out
            localStorage.removeItem('authToken');
            // Give user feedback
            alert('You have been logged out.');
            // Redirect the user to the homepage
            window.location.href = '/index.html';
        });
    }


    // --- 3. LIVE SEARCH DROPDOWN LOGIC ---
    // This is the new logic for the search bar functionality.

    // A) Debounce Helper Function (to prevent API spam)
    function debounce(func, delay = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // B) Function to render search results in the dropdown
    function renderResults(posts, container) {
        if (!container) return; // Defensive check
        container.innerHTML = '';
        container.style.display = 'block';

        if (posts.length === 0) {
            container.innerHTML = '<div class="search-result-item text-muted">No Results found.</div>';
            return;
        }

        posts.forEach(post => {
            const resultItem = document.createElement('a');
            resultItem.className = 'search-result-item';
            resultItem.href = `/view-post.html?id=${post._id}`;
            resultItem.textContent = post.title;
            container.appendChild(resultItem);
        });
    }

    // C) Main Function to perform the search fetch
    async function performSearch(query) {
        if (!searchResultsDropdown) return;

        const endpoint = query ?
        `/api/posts/search?q=${encodeURIComponent(query)}` : // Use search endpoint if query exists
        '/api/posts?limit=5'; // Otherwise get 5 latest posts

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Search failed');
            const posts = await response.json();
            renderResults(posts, searchResultsDropdown);
        } catch (error) {
            console.error('Search error: ', error);
            searchResultsDropdown.innerHTML = '<div class="search-result-item text-danger">Could not fetch results.</div>';
            searchResultsDropdown.style.display = 'block';
        }
    }

    // D) Attach Event Listeners for Search
    if (searchInput && searchResultsDropdown) {
        const debouncedSearch = debounce(performSearch);

        searchInput.addEventListener('input', () => debouncedSearch(searchInput.value.trim()));

        searchInput.addEventListener('focus', () => {
            if (!searchInput.value.trim()) {
                performSearch(''); // Show latest posts on focus if empty
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchForm.contains(event.target)) {
                searchResultsDropdown.style.display = 'none';
            }
        });
    }
});

// --------------------------------------------------------------------------------------
