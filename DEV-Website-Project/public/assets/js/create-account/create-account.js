// add an event listener to the 'search-icon' element to handle file swapping on hover: 
const searchIcon = document.getElementById('search-icon');
const searchIconFile = document.getElementById('search-icon-file');

// Change the image on hover: 
searchIcon.addEventListener('mouseenter', () => {
    searchIconFile.src = '../assets/images/create-account/search-icon-blue.svg';
})

// Change the image back when mouse leaves: 
searchIcon.addEventListener('mouseleave', () => {
    searchIconFile.src = '../assets/images/create-account/search-icon.svg';
})

// ---1. Select necessary DOM elements ---
// Make sure IDs match your create-account.html file
const signupForm = document.getElementById('createUserForm');
const profilePictureInput = document.getElementById('profilePicture');
const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirmation');
const captchaCheck = document.getElementById('captcha-check');
const submitButton = document.getElementById('submit-button')

// OPTIONAL: Select an element to display error messages
const usernameErrorDiv = document.getElementById('username-error');
const emailErrorDiv = document.getElementById('email-error');
const passwordErrorDiv = document.getElementById('password-error');
const passwordConfirmErrorDiv = document.getElementById('password-confirm-error');
const captchaErrorDiv = document.getElementById('captcha-error');
// Add others if needed

// --- Create Function to Easily Show/Hide Errors (Helper Functions) ---
function displayError(inputElement, errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block'; // Show the error message div
    // Only add the .is-invalid class (for red border) if the element is not a checkbox 
    if (inputElement.type !== 'checkbox') {
        inputElement.classList.add('is-invalid');
    }
}

function clearError(inputElement, errorDiv) {

    errorDiv.textContent = '';
    errorDiv.style.display = 'none'; // Hide the error message div
    
    // Only remove the .is-invalid class if the element is NOT a checkbox
    if (inputElement.type !== 'checkbox') {
        inputElement.classList.remove('is-invalid');
    }
}



// --- 2. Add Submit Event Listener ---

signupForm.addEventListener('submit', async (event) => {
    // Prevent the default browser form submission (which causes a page reload)
    event.preventDefault();

    // --- Clear Previous Errors ---
    clearError(usernameInput, usernameErrorDiv);
    clearError(emailInput, emailErrorDiv);
    clearError(passwordInput, passwordErrorDiv);
    clearError(passwordConfirmInput, passwordConfirmErrorDiv);
    clearError(captchaCheck, captchaErrorDiv);

    // --- 3. Get Input Values ---
    const profilePicUrl = profilePictureInput.value.trim();
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value; // Don't trim passwords
    const passwordConfirm = passwordConfirmInput.value 

    // --- 4. Basic Client Side Validation ---
    if (password !== passwordConfirm) {
        // Use the helper functions
        displayError(passwordInput, passwordErrorDiv, 'Passwords do not match.');
        displayError(passwordConfirmInput, passwordConfirmErrorDiv, 'Passwords do not match.');
        return // Stop the function
    }
    // Add other client-side check here (e.g., simple password length)
    if (password.length < 8) { // Example basic length check
        displayError(passwordInput, passwordErrorDiv, 'Password must be at least 8 characters.');
        return // Stop the function
    }

    // Check if captcha is checked
    if (!captchaCheck.checked) {
        displayError(captchaCheck, captchaErrorDiv, 'Please verify you are not a robot.');
        return;
    }
    // Add checks for empty fields if needed (though HTML 'required' helps)

    // --- 5. Prepare Data Payload for API ---
    const userData = {
        name,
        username,
        email,
        password, // Send plain password, backend will hash
        profilePictureUrl: profilePicUrl
    }

    // --- 6. Make API Call Using Fetch ---
    try {
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textcontent = 'Signing up...';

        const response = await fetch('/api/auth/signup', { // Use your backend URL/Port
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData) // Convert the JS object into a JSON string
        });
        
        // --- 7. Handle the Response ---
        // A) Check if the HTTP request itself was successful (status code 2**)
        if (response.ok) { // Checks for status code 200-209
            // B) **Parse the JSON data from the successful response body**
            const data = await response.json(); // 'data' now holds the object sent back by the server
            
            console.log('Signup success response:', data); // Log server response for debugging

            // C) **Use the parse JSON data (specifically the token)**
            if (data.token) {
                // Store the received token in the browser's localStorage
                localStorage.setItem('authToken', data.token);
                console.log('Token stored succesfully!');

                // Inform the user and redirect
                alert('Account created successfully! Please log in.');
                window.location.href = '/login.html'; // Redirect to login page
            } else {
                // If missing token in data object
                alert('Signup successfull, but missing token. Please try logging in.');
                window.location.href = '/login.html'; 
            }
        } else {
            // D) Handle HTTP error responses (status codes 4**, 5**)
            let errorData;
            try {
                // Try to parse error details sent back by the server (if it sends JSON errors)
                errorData = await response.json();
            } catch (parseError) {
                // This catch block is now less likely to be needed for parsing
                // errors unless the server sends non-JSON error responses,
                // but it's okay to keep as a fallback
                console.error("Failed to parse error response as JSON:", parseError)
                errorData = { error: { message: `Signup failed: Server responded with status ${response.status}` }};
            }
            console.error('Signup Failed:', errorData); // Log the actual parsed error


            
            // --- Display specific field errors ---
            // Check the structure your backend actually sends 
            // Assuming backend sends { error: { message: '...', status: 400, field: '...' }}
            // based on createError(status, message, { field: '...' })
            console.log('DEBUG: Full errorData object:', JSON.stringify(errorData, null, 2)); // Log the whole structure
            const field = errorData.error?.field // Get field property if it exists
            console.log('DEBUG: Extracted field variable:', field); // See what 'field' contains
            const message = errorData.error?.message || 'An unknown error occurred.'; // Get message
            console.log('DEBUG: Extracted message variable:', message); // See what 'message' contains

            if (field === 'email') {
                console.log("DEBUG: Condition field === 'email' is TRUE")
                displayError(emailInput, emailErrorDiv, message);
            } else if (field === 'username') {
                console.log("DEBUG: Condition field === 'username' is TRUE")
                displayError(usernameInput, usernameErrorDiv, message);
            } else if (field === 'password') { // Handle the potential errors too
                console.log("DEBUG: Condition field === 'password if TRUE")
                displayError(passwordInput, passwordErrorDiv, message);
            } else {
                console.log("DEBUG: Fallback 'else' block executed.")
                // Display general error if field isn't specified
                alert(`Signup failed: ${message}`)
            }
        }
    } catch (error) {
        // E) Handle network errors (fetch failed to connect to the server)
        console.error('Netwok error during signup:', error);
        alert('Could not connect to the server. Please check your network and try again. Tralalelo tralala');
        // Optionally display error in errorMessageDiv

    } finally {
        // --- 8. Reset Button State --- 
        // This runs whether the try block succeeded or failed
        submitButton.disabled = false;
        submitButton.textContent = 'Sign up';
    }
});
