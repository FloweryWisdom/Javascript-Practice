
//This event listener waits for the basic HTML structure to be ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Auth Guard ---
    // This is a critical security and UX feature. It checks if a user is logged in. 
    // If not, it redirects them away from this page, as only logged-in users can create posts.

    // Retrieve the token from where we stored it after login/signup. 
    const token = localStorage.getItem('authToken');

    if (!token) {
        // If no token is found, the user is not authenticaded.
        alert('You must be logged in to create a post.');
        // Redirect them to the login page.
        window.location.href = './login.html';
        return; // Stop the rest of the script from executing.
    }

    // --- 2. Select Form Elements --- 

    // UI Interactivity Elements
    const iconsContainer = document.getElementById('icons-container');
    const icons = iconsContainer ? iconsContainer.querySelectorAll('img') : [];
    const footer = document.getElementById('create-post-footer');

    // Form Submission Elements 
    const createPostForm = document.getElementById('create-post-form');
    const postImageUrlInput = document.getElementById('post-image-url');
    const postTitleInput = document.getElementById('post-title');
    const postHashtagsInput = document.getElementById('post-tags');
    const postContentInput = document.getElementById('post-content');
    const submitButton = createPostForm.querySelector('button[type="submit"]');

    // --- 3. Helper Function Definitions ---
    // Define any reusable functions here.
    function updateRevertButtonText() {
        if (!footer) return; // Don't run if the footer element doesn't exist

        // Select the 4th child element from 'create-post-footer' parent element
        const revertButton = footer.querySelectorAll('button')[3]; // Index 3 is the 4th element (never forget)

        if (revertButton) { // Check if the button was found
            if (window.innerWidth < 768) {
                revertButton.textContent = 'Revert';
            } else {
                revertButton.textContent = 'Revert new changes';
            }

        }
    }

    // --- 4. Event Listener Attachments --- 

    //--- A) UI Interactivity Listeners ---
    // Loop through each icon and attach mouseenter and mouseleave event listeners
    if (icons.length > 0) {
        icons.forEach(icon => {
            const originalSrc = icon.src; 
            icon.addEventListener('mouseenter', () => {
                const hoverSrc = icon.getAttribute('data-hover');
                if (hoverSrc) {
                    icon.src = hoverSrc;
                }
            });
            icon.addEventListener('mouseleave', () => {
                icon.src = originalSrc; 
            });
        });
    }

    // Call the function on window resize
    window.addEventListener('resize', updateRevertButtonText);

    // --- B) Form Submission Listener ---
    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission reload

        // Get the token again, just in case it was removed in another tab.
        const currentToken = localStorage.getItem('authToken');
        if (!currentToken) {
            alert('Your session has expired. Please log in again.');
            window.location.href = './login.html';
            return;
        }

        // --- Prepare the Post Data ---
        // Get values from the form inputs.
        const imageUrl = postImageUrlInput.value.trim();
        const title = postTitleInput.value.trim();
        // Process hashtags: split the string by commas, trim whitespace from each tag,
        // and filter out any empty tags that might result from trailing commas.
        const hashtags = postHashtagsInput.value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag); // This removes empty strings
        const content = postContentInput.value.trim();
        
        // Client-side validation
        if (!title || !content || !imageUrl) {
            alert('Title, content, and image URL are required.');
            return;
        }

        const postData = {
            imageUrl,
            title,
            hashtags,
            content
        };

        // --- 4. Make the Authenticated API Call --- 
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Publishing...';

            // Fetch request to the backend's "create post" endpoint.
            const response = await fetch('/api/posts', {
                method: 'POST',
                // This is the crucial part for protected routes:
                headers: {
                    'Content-Type': 'application/json',
                    // The 'Authorization' header tells the backend who is making the request.
                    // The 'Bearer' scheme is the standard way to format a JWT.
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify(postData)
            });
            
            if (response.ok) {
                // If the post was created successfully (status 201 created)
                const newPost = await response.json();
                console.log('Post created successfully:', newPost);
                alert('Your post has been published!');
                // Redirect to the homepage to see the new post at the top
                window.location.href = './index.html';
            } else {
                // Handle server-side validation errors or other issues
                const errorData = await response.json();
                console.error('Error creating post:', errorData);
                alert(`Failed to create post: ${errorData.error?.message || 'Please check your input and try again.'}`);
            }
        } catch (error) {
            // Handle network errors (e.g., server is down)
            console.error('Network error while creating post:', error);
            alert('A network error occured. Please try again later.');
        } finally {
            // Re-enable the button whether the request succeeded or failed
            submitButton.disabled = false;
            submitButton.textContent = 'Publish';
        }
    });

    // --- 5. Initial Function Calls on Page Load ---
    // Call the function once when the page loads to set the inital button text.
    updateRevertButtonText();
});



