// --- 1. Select Necessary DOM Elements ---
// Make sure the IDs match your login.html file
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const emailErrorDiv = document.getElementById('login-email-error');
const passwordErrorDiv = document.getElementById('login-password-error');
const submitButton = loginForm.querySelector('button[type="submit"]');

// --- Copy or Import Helper functions --- 
// You can copy the displayError and clearError functions from create-account.js
// Or, ideally, move them to a shared utility file and import them in both scripts
// For now, let's copy them
function displayError(inputElement, errorDiv, message) {
    if (!errorDiv) return; // Add check if errorDiv exists
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    if (inputElement.type !== 'checkbox') {
        inputElement.classList.add('is-invalid')
    }
}

function clearError(inputElement, errorDiv) {
    if (!errorDiv) return; // Add check
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    if (inputElement.type !== 'checkbox') {
        inputElement.classList.remove('is-invalid');
    }
}

// --- 2. Add Submit Event Listener ---
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default page reload

    // --- Clear Previous Errors ---
    clearError(emailInput, emailErrorDiv);
    clearError(passwordInput, passwordErrorDiv);

    // --- 3. Get Input Values ---
    const email = emailInput.value.trim();
    const password = passwordInput.value; // Don't trim passwords

    // --- 4. Client-Side Validation ---
    let validationFailed = false;
    if (!email) {
        displayError(emailInput, emailErrorDiv, 'Please enter your email.');
        validationFailed = true;
    }
    if (!password) {
        displayError(passwordInput, passwordErrorDiv, 'Please enter your password.');
        validationFailed = true;
    }
    if (validationFailed) {
        return; // Stop if client validation failed
    }

    // --- 5. Prepare Data Payload for API ---
    const loginData = {
        email,
        password
    }

    // --- 6. Make API Call Using Fetch ---
    try {
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Logging In...';

        const response = await fetch('/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData) // Convert the JS object into a JSON string
        })

        // --- 7. Handle the Response ---
        // A) Check if the HTTP request itself was successful (status code 2**)
        if (response.ok) {
            // B) **Parse the JSON data from the successful response body** 
            const data = await response.json();

            console.log('Login success response:', data); // Log server response

            // C) **Use the parsed JSON data (specifically the token)**
            if (data.token) {
                // Store the received token in the browser's localStorage
                localStorage.setItem('authToken', data.token);
                console.log('Token stored successfully!');
                // Inform the user and redirect
                alert('Login successfully!'); // Keep alert for succes or replace with UI message
                window.location.href = '/index.html'; // Redirect to homepage/dashboard
            } else {
                alert('Login successful, but missing token.'); // Should not happen ideally
            }
        } else {
            // D) Handle HTTP error responses (status codes: 4**, 5**)
            let errorData; 
            try {
                errorData = await response.json();  
            } catch (parseError){
                errorData = { error: { message: `Login failed with status ${response.status}` }};
            }
            console.error('Login failed:', errorData); 
            const message = errorData.error?.message || 'An unknown error occured.';

            // Display the error - often "Invalid Credentials" for 401
            // Show it below the password field as a general place for login failure
            displayError(passwordInput, passwordErrorDiv, message);
            displayError(emailInput, emailErrorDiv, ''); // Show border only
        

        }
    } catch (error) {
        // E) Handle network errors
        console.error('Network error during login:', error);
        displayError(passwordInput, passwordErrorDiv, 'Network error. Please try again.');
    } finally {
        // --- 8. Reset Button State ---
        submitButton.disabled = false;
        submitButton.textContent = 'Log in';
    }
});