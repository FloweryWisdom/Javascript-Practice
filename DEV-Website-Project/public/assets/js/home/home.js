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

    // --- 2. Function to Create the HTML for a Single Post Card ---
    // This function acts as our HTML template. It takes a single 'post' object from our database
    // and a boolean 'isFirstPost' to handle our special display requirement (show image of first post in homepage).
    function createPostCard(post, isFirstPost = false) {
        
        // --- Data Preparation and Fallback --- 
        // Safely access nested author data using optional chaining (?.).
        // If posts.author exists, use post.author.username; otherwise 'Unknown Author'. 
        const authorUsername = post.author?.username || 'Unknown Author';
        // Provide a default avatar if the user doesn't have one specified.
        const authorProfilePic = post.author?.profilePictureUrl || '/assets/images/global/icons/default-avatar.png'; // Make sure you have a default avatar image

        // --- Conditional Image for the First Post ---
        // We create an HTML string for the image. It will be empty unless it's the first post.
        let imageHtml = '';
        if (isFirstPost && post.imageUrl) {
            // Template Literal: A modern way to create multi-line strings with embedded variables.
            imageHtml = `<img src="${post.imageUrl}" alt="${post.title || 'Post Image'}" class="post-card-image card-img-top rounded-top">`;
        }
        // For all other posts, 'imageHtml' will remain an empty string, so no <img> tag is rendered.

        // --- Date Formatting --- 
        // Make ISO date string from MongoDB more human-readable.
        const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric' // e.g., "May 5"
        });

        // --- Hashtags Formatting --- 
        // Check if the hashtags array exists and has items.
        // If so, map over the array to create an <li> for each tag.
        // .join('') combines the array of HTML strings into a single string.
        let hashtagsHtml = '';
        if (post.hashtags && post.hashtags.length > 0) {
            hashtagsHtml = `
                <div class="post-hashtags-container">
                    <ul class="hashtags-list d-flex flex-wrap list-unstyled gap-1">
                        ${post.hashtags.map(tag => `<li class="d-flex align-items-center">#${tag}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // --- Create the main wrapper element for the card --- 
        // Creating elements with JavaScript is more robust than just using innerHTML on the container.
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'post-card shadow-sm rounded bg-light mb-3'; // We uses classes defined in our template
        
        // --- Populate the card wrapper with the full card structure using innerHTML ---
        // This combines all our prepared data into the final HTML structure.
        cardWrapper.innerHTML = `
            ${imageHtml}
            <div class="post-card-body p-3">
                <div class="post-card-user-info d-flex gap-2 align-items-center">
                    <div class="post-user-profile-picture-container">
                        <a href="#"><img src="${authorProfilePic}" alt="${authorUsername}'s avatar" class="user-profile-picture rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                        </a>
                    </div>
                    <div class="post-user-info">
                        <div class="dropdown">
                            <p class="user-info-username"> <strong> <a href="#" class="dropbtn text-decoration-none text-reset">${authorUsername}</a></strong></p>
                            <div class="dropdown-content rounded overflow-hidden">
                                <div class="dropdown-banner" style="height: 36px; width: auto; background-color: navy; "></div>
                                <div class="dropdown-user-data d-flex">
                                    <div class="user-data-profile-pic"> <a href="#"> <img src="${authorProfilePic}" alt=""></a></div>
                                    <p class="user-data-profile-name-container m-0" ><a class="user-data--profile-name" href="#"><b>${authorUsername}</b></a></p>
                                </div>
                                <button class="user-data-button btn btn-primary">Follow</button>
                                <div class="user-data-tagline-container">
                                    <p>A bit of content creation here and there 👀 Ex-TikTok and Uber Analytics</p>
                                </div>
                                <div class="user-data-info">
                                    <b>EMAIL</b>
                                    <p>email@email.com</p>
                                </div>
                                <div class="user-data-info">
                                    <b>WORK</b>
                                    <p>DevRel Lead @Quine</p>
                                </div>
                                <div class="user-data-info">
                                    <b>LOCATION</b>
                                    <p>city, country</p>
                                </div>
                                <div class="user-data-info">
                                    <b>EDUCATION</b>
                                    <p>Imperial College Education</p>
                                </div>
                                <div class="user-data-info">
                                    <b>JOINED</b>
                                    <p>May 3, 2023</p>
                                </div>
                            </div>
                        </div>
                        <div class="post-time-container">
                            <small class="post-time text-muted">Posted on ${postDate}</small>
                        </div>
                    </div>
                </div>
                <div class="post-title my-2 text-wrap">
                    <h2 class="mb-0"><strong> <a class="post-link" href="./view-post.html?id=${post._id}">${post.title}</a> </strong></h2>
                </div>

                <div style="padding-left: 50px;">
                    ${hashtagsHtml}
                    <div class="post-reactions d-flex flex-wrap">
                        <a href="#" class="reactions-hover-container d-flex justify-content-between align-items-center text-decoration-none ps-2">
                            <div class="reaction-emojis d-flex align-items-center">
                                <img class="emoji icon-number-1" src="./assets/images/global/icons/reaction-love.svg" alt="">
                                <img class="emoji icon-number-2" src="./assets/images/global/icons/reaction-unicorn.svg" alt="">
                                <img class="emoji icon-number-3" src="./assets/images/global/icons/reaction-exploding.svg" alt="">
                                <img class="emoji icon-number-4" src="./assets/images/global/icons/reaction-raised-hands.svg" alt="">
                                <img class="emoji icon-number-5" src="./assets/images/global/icons/reaction-fire.svg" alt="">
                            </div>
                            <p class="reactions-number mb-0">16 Reactions</p>
                        </a>
                        <p class="comment-number mb-0 d-flex align-items-center"> <img src="./assets/images/global/icons/reaction-comment.svg" alt="">&nbsp&nbsp2 Comments</p>
                        <small class="post-read-duration">3 min</small>
                        <div class="post-bookmark-container d-flex align-items-center">
                            <img class="post-bookmark-icon m-0" src="./assets/images/global/icons/reaction-save.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return cardWrapper;
    }

    // --- 3. Function to Fetch All Posts and Render them ---
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

    // --- 4. Initial Execution --- 
    // Call our main function to start the process of fetching and displaying posts.
    fetchAndDisplayPosts();
});