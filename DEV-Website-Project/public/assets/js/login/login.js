// --- 1. Select Necessary DOM Elements ---
// Make sure the IDs match your login.html file
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const submitButton = loginForm.querySelector('button[type="submit"]');

// Optional: Select an element to display error messages
// const errorMessageDiv = document.getElementById('login-error-message');

// --- 2. Add Submit Event Listener ---
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default page reload

    // Clear previous error messages/styles if any
    // if (errorMessageDiv) errorMessageDiv.textContent = '';
    // Remove any 'is-invalid' classes from inputs

    // --- 3. Get Input Values ---
    const email = emailInput.value.trim();
    const password = passwordInput.value; // Don't trim passwords

    // --- 4. Basic Client-Side Validation ---
    if (!email || !password) {
        alert('Please enter both email and password.');
        // Optionally display error in errorMessageDiv
        return ; // Stop the function
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
                alert('Login successfully!');
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
                // Optionally display error in errorMessageDiv
            }
            console.error('Login failed:', errorData); 
            // Display the error message
            alert(`Login failed: ${errorData.error?.message || 'Invalid credentials or server error.'}`);
            // Optionally display error in errorMessageDiv

        }
    } catch (error) {
        // E) Handle network errors
        console.error('Network error during login:', error);
        alert('Could not connect to the server. Please check your network and try again.');
        // Optionally display error in errorMessageDiv
    } finally {
        // --- 8. Reset Button State ---
        submitButton.disabled = false;
        submitButton.textContent = 'Log in';
    }
});