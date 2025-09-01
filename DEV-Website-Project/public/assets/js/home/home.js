// Import createPostCard() function from shared utility file
import { createPostCard } from '../utils/render.js';

// This event listener ensures our script runs only after the entire HTML document
// has been loaded and parsed. This prevents errors from trying to find elements 
// that haven't been created yet. 
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DOM Element Selection ---
    // We select the crucial elements from our index.html that we'll need to interact with.
    // We use 'const' becuase these references won't change.

    // The main container where all dynamically created post cards will be placed.
    const postsContainer = document.getElementById('posts-container');
    // The 'Loading...' message div.
    const loadingIndicator = document.getElementById('posts-loading');
    // The div to show an error message if the posts fail to load.
    const errorIndicator = document.getElementById('posts-error');


    // --- 2. Function to Fetch All Posts and Render them ---
    // This is the main asynchronous function that orchestrates the process.
    async function fetchAndDisplayPosts() {
        // Simple check to ensure our main container exists before we do anything.
        if (!postsContainer) {
            console.error('Posts container element not found!');
            return;
        }

        // Show a loading message while we fetch data. 
        loadingIndicator.style.display = 'block';
        postsContainer.innerHTML = ''; // Clear out any old content like static templates

        try {
            // Use fetch to make a GET request to our backend API endpoint for posts.
            // We use a relative path, which works because the frontend is served from the same origin as the backend.
            const response = await fetch('/api/posts');

            // Check if the server responded with a non-successful status code (e.g., 404, 500).
            if (!response.ok) {
                // If the response is not ok, we create our error to be caught by the catch block.
                throw new Error(`Server responded with status: ${response.status}`);
            }

            // If the response is OK, parse the JSON body to get our array of posts.
            const posts = await response.json();

            // Hide the loading message now that we have the data (or an error).
            loadingIndicator.style.display = 'none';

            // Check if we received any posts.
            if (posts && posts.length > 0) {
                // If we have posts, loop through each one using forEach.
                // The 'index' variable is provided by forEach and helps us identify the first post.
                posts.forEach((post, index) => {
                    // Determine if this is the first post in the array.
                    const isFirst = (index === 0);
                    // Create the HTML element for the post card.
                    const postCardElement = createPostCard(post, isFirst);
                    // Append the newly created card to our main container.
                    postsContainer.appendChild(postCardElement);
                });
            } else {
                // If the posts array is empty, display a friendly message.
                postsContainer.innerHTML = '<p class="text-center my-4">No posts found. Why not create the first one?</p>'
            }

        } catch (error) {
            // This 'catch' block handles network errors (e.g., server is down)
            // or errors we threw manually (like !response.ok).
            console.error('Failed to fetch posts:', error);

            // Hide the loading indicator and show the error message.
            loadingIndicator.style.display = 'none';
            errorIndicator.style.display = 'block';
            errorIndicator.textContent = "Sorry, we couldn't load the posts. Please try refreshing the page.";
        }
    }

    // --- 3. Initial Execution --- 
    // Call our main function to start the process of fetching and displaying posts.
    fetchAndDisplayPosts();
});