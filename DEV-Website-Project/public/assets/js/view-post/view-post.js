// This event listener ensures our script runs only after the HTML is ready
// All of our page-specific logic will go inside here.
document.addEventListener('DOMContentLoaded', () => {

    // --- GET POST ID FROM URL ---
    // This is the first thing we do. We need the ID to fetch the correct post.
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // If there's no ID in the URL, we can't do anything. We'll show an error and stop.
    if (!postId) {
        document.body.innerHTML = '<div class="alert alert-danger text-center m-5">Error. Post ID is missing from the URL.</div>';
        console.error('No post ID found.');
        return // Stop the rest of the script from executing
    }
    

    const token = localStorage.getItem('authToken');

    // --- 1. DOM ELEMENT SELECTIONS ---
    // Group all element selections here for clarity and easy reference.

    // Elements for the hover dropdown logic
    const trigger = document.getElementById('hover-trigger');
    const dropdown = document.getElementById('add-reactions-container-dropdown');

    // UI Interactivity Elements
    const iconButtons = document.querySelectorAll('.post-options');
    const reactionsDropdown = document.getElementById('add-reactions-container-dropdown');
    const sidebarCommentCount = document.getElementById('sidebar-comment-count');
    // Add any other selectors for displaying counts

    // Elements for the responsive company name and logic
    const promotedInfoCard = document.getElementById('card-3-promoted-company-info');

    // Elements to change classname based on screen size
    const postContainer = document.getElementById('post-content-section');
    const websiteLogoIcon = document.getElementById('website-logo');
    const profileDropdownButton = document.getElementById('profileDropdown'); 
    const searchContainer = document.getElementById('search-container');
    const createPostButton = document.getElementById('create-post-button'); 
    const postAuthorContainer = document.getElementById('post-author-info');
    const loginButton = document.getElementById('login-button');
    const createAccountButton = document.getElementById('create-account-button');

    // --- Selectors for Dynamic Post Content ---
    const postImage = document.querySelector('.post-test--image');
    const authorProfilePicture = document.getElementById('author-profile-picture');
    const authorUsername = document.getElementById('author-username');
    const postDate = document.getElementById('post-date');
    const postTitle = document.querySelector('.post-test--title h1');
    const postLink = document.querySelector('.post-test--title a.link-post');
    const hashtagContainer = document.querySelector('.hashtags--list');
    const postContent = document.getElementById('post-text-content');
    // Note: you have two elements with id="post-reactions". IDs should be unique.
    // We'll select the first one found for now.
    const postReactions = document.querySelector('#post-reactions');
    
    // --- Selectors for the Comment Section ---
    const commentsListContainer = document.getElementById('comments-list-container');
    const newCommentForm = document.getElementById('new-comment-form');
    const newCommentTextarea = document.getElementById('new-comment-textarea');
    const commentCountSpan = document.getElementById('comment-count-span');

    // --- 2. FUNCTION DEFINITIONS ---
    // Define all your helper functions in this section.

    // --- Function to create the HTML for a single comment ---
    function createCommentElement(comment) {
        // Create the main wrapper div for the comment
        const commentWrapper = document.createElement('div');
        commentWrapper.className = 'comment d-flex align-items-start gap-3 mb-4';

        // Format the date for display
        const commentDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        });

        // Use optional chaining (?.) for safety, in case author isn't populated
        const authorUsername = comment.author?.username || 'Anonymous';
        const authorAvatar = comment.author?.profilePictureUrl || '/assets/images/global/icons/default-avatar.png';

        // Set the innerHTML of the comment wrapper
        commentWrapper.innerHTML = `
            <img src="${authorAvatar}" alt="${authorUsername}'s avatar" class="rounded-circle mt-1" style="width: 40px; height: 40px; object-fit: cover;">
            <div class="comment-main-content card w-100">
                <div class="card-body">
                    <div class="comment-header d-flex align-items-center mb-2">
                        <span class="comment-author fw-bodl me-2">${authorUsername}</span>
                        <span class="comment-date text-muted">${commentDate}</span>
                        <div class="ms-auto">
                            <button class="btn btn-sm border-0">...</button>
                        </div>
                    </div>

                    <div class="comment-body">
                        <p class="mb-0">${comment.content}</p>
                    </div>
                </div>

                <div class="card-footer bg-transparent border-top-0 d-flex gap-3">
                    <button class="like-button btn btn-sm d-flex align-items-center gap-1" data-comment-id="${comment._id}">
                        <img src="./assets/images/global/icons/icon--like.svg" alt="Like" style="height: 18px;">
                        <span data-like-count="${comment._id}">${comment.likes.length}</span>
                    </button>
                    <button class="btn btn-sm d-flex align-items-center gap-1">
                        <img src="./assets/images/global/icons/reaction-comment.svg" alt="Reply" style="height: 18px;">
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        `;
        return commentWrapper;
    }


    // --- Function for handling like clicks ---
    function setupLikeListeners() {
        // Event Delegation: We add ONE listener to the parent container.
        commentsListContainer.addEventListener('click', async (event) => {
            // Check if the clicked element (or its parent) is a like button.
            const likeButton = event.target.closest('.like-button');
            if (!likeButton) return; // If not, do nothing.

            if (!token) { // Use the token variable defined at the top
                alert("You must be logged in to like comment.");
                return;
            }

            // Get the comment ID from the data attribute we added. 
            const commentId = likeButton.dataset.commentId;

            try {
                // Make the API call to our new 'like' endpoint
                const response = await fetch(`/api/posts/${postId}/comments/${commentId}/like`, {
                    method: 'PATCH',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to like comment.');
                }

                const { comment: updatedComment } = await response.json();
                
                // --- Update the UI instantly ---
                // Find the specific like count span for this comment and update it
                const likeCountSpan = likeButton.querySelector(`[data-like-count="${commentId}"]`);
                if (likeCountSpan) {
                    likeCountSpan.textContent = `${updatedComment.likes.length} likes`;
                }

                // Optional: Change the button's style to show it's liked.
                // You should add a 'liked' class and style it with CSS.

            } catch (error) {
                console.error('Error liking comment.', error);
                alert(`Error: ${error.message}`)
            }
        });
    }

    // --- Function to fetch and display all comments for the post ---
    async function fetchAndDisplayComments(currentPostId) {
        if (!commentsListContainer) return; 

        try {
            const response = await fetch(`/api/posts/${currentPostId}/comments`);
            if (!response.ok) {
                throw new Error('Failed to load comments.');
            }
            const comments = await response.json();

            // Clear the static example comment(s)
            commentsListContainer.innerHTML = '';

            // Update the comment count in the header
            if (commentCountSpan) {
                commentCountSpan.textContent = comments.length;
            }

            // Update the comment count in the left sidebar
            if (sidebarCommentCount) {
                sidebarCommentCount.textContent = comments.length;
            }

            if (comments.length > 0) {
                // Loop through the fetched comments and add them to the page
                comments.forEach(comment => {
                    const commentElement = createCommentElement(comment);
                    commentsListContainer.appendChild(commentElement);
                });
            } else {
                commentsListContainer.innerHTML = '<p class="text-center text-muted">Be the first to comment!</p>';
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            if (commentsListContainer) {
                commentsListContainer.innerHTML = '<p class="text-center text-danger">Could not load comments.</p>';
            }
        }
    }

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
        if (!postContainer || !websiteLogoIcon || !profileDropdownButton || !searchContainer || !createPostButton || !postAuthorContainer || !loginButton || !createAccountButton ) return;

        const width = window.innerWidth;
        
        // Reset column classes
        postContainer.classList.remove('col-12', 'col-11', 'col-8');

        if(width < 768) {
            postContainer.classList.add('col-12');
            searchContainer.classList.add('d-none');
            searchContainer.classList.remove('d-flex');
            createPostButton.classList.add('ms-auto');
            loginButton.classList.add('ms-auto');
            postAuthorContainer.classList.add('mb-4');
            postAuthorContainer.classList.remove('mb-5');
        } else if (width < 1023) {
            postContainer.classList.add('col-11');
            searchContainer.classList.add('d-flex');
            searchContainer.classList.remove('d-none');
            createPostButton.classList.remove('ms-auto');
            loginButton.classList.remove('ms-auto');
            postAuthorContainer.classList.add('mb-5');
            postAuthorContainer.classLlist.remove('mb-4');
            websiteLogoIcon.classList.add('ms-2');
            websiteLogoIcon.classList.remove('ms-5');
            profileDropdownButton.classList.add('me-2');
            profileDropdownButton.classList.remove('me-5');
            createAccountButton.classList.add('me-2');
            createAccountButton.classList.remove('me-5');
        } else {
            postContainer.classList.add('col-8');
            searchContainer.classList.add('d-flex');
            searchContainer.classList.remove('d-none');
            createPostButton.classList.remove('ms-auto');
            createPostButton.classList.remove('ms-auto');
            postAuthorContainer.classList.add('mb-5');
            postAuthorContainer.classList.remove('mb-4');
            websiteLogoIcon.classList.add('ms-5');
            websiteLogoIcon.classList.remove('ms-2');
            profileDropdownButton.classList.add('me-5');
            profileDropdownButton.classList.remove('me-2');
            createAccountButton.classList.add('me-5');
            createAccountButton.classList.remove('me-2');
        }
        
    }

    // This function attaches event listeners to our reaction buttons.
    function setupReactionListeners() {
        if (!reactionsDropdown) return;

        // Use event delegation on the dropdown container for efficiency
        reactionsDropdown.addEventListener('click', async (event) => {
            // Find the button that was clicked, even if the user clicked the image inside it
            const reactionButton = event.target.closest('.reaction-button');
            if (!reactionButton) return;

            // Get the reaction type from the data-reaction attribute we added
            const reactionType = reactionButton.dataset.reaction;
            const token = localStorage.getItem('authToken');

            // Can't react if not logged in
            if (!token) {
                alert('You must be logged in to react.');
                window.location.href = '/login.html';
                return;
            }

            try {
                // Call our new backend endpoint. 'postId' should be available from the outer scope.
                const response = await fetch(`/api/posts/${postId}/react`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ reactionType: reactionType })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to submit reaction.');
                }

                // If successful, the backend sends back the updated post object
                const { post: updatedPost } = await response.json();

                // --- Dynamically update the UI with the new counts ---
                updateReactionUI(updatedPost);

            } catch (error) {
                console.error('Error submitting reaction:', error);
                alert(`Error: ${error.message}`);
            }
        });
    }

    // This function takes the entire post object from the API and updates ALL reaction on UI
    function updateReactionUI(post) {
        if (!post || !post.reactions ) return; // Safety check

        const { reactions } = post;
        const token = localStorage.getItem('authToken');
        let currentUserId = null;

        // Decode token to find current user's ID (for highlighting their own reaction)
        if (token) {
            try {
                // The payload is in the second part of the JWT
                const payload = JSON.parse(atob(token.split('.')[1]));
                currentUserId = payload.userId;
            } catch (e) {
                console.error('Failed to decode token:', e);
            }
        }

        // --- Update the total reaction counter ---
        const totalReactionsElement = document.querySelector('#hover-trigger p');
        if (totalReactionsElement) {
            // Calculate the sum of all reaction array lengths
            const totalCount = Object.values(reactions).reduce((sum, arr) => sum + arr.length, 0);
            totalReactionsElement.textContent = totalCount;
        }

        // --- Display only reactions with a count > 0 in post body ---
        const postReactionsContainer = document.getElementById('post-reactions');
        if (postReactionsContainer) {
            postReactionsContainer.innerHTML = ''; // Clear existing static reactions

            // Define the exact order you want the icons to appear in
            const reactionOrder = ['heart', 'unicorn', 'exploding', 'fire', 'eyes'];

            // Loop through the defined order
            reactionOrder.forEach(type => {
                // Check if this reaction type exists in the data and has a count > 0
                if (reactions[type] && reactions[type].length > 0 ) {
                    const count = reactions[type].length;

                    const reactionDisplay = document.createElement('div');
                    reactionDisplay.className = 'icon-container d-flex align-items-center me-3';
                    // This assumes your reaction images are named 'reaction-heart.svg', 'reaction-unicorn.svg', etc.
                    reactionDisplay.innerHTML = `
                        <img class="icon-reaction" src="/assets/images/view-post/post-view/reaction-${type}.svg" alt="${type}">
                        <p class="icon-reaction-count ms-1 mb-0">${count}</p> 
                    `;
                    postReactionsContainer.appendChild(reactionDisplay);
                }
            })

        }

        // --- Update the dropdown counters and highlight selected reaction ---
        const reactionButtons = document.querySelectorAll('#add-reactions-container-dropdown .reaction-button');
        reactionButtons.forEach(button => {
            const reactionType = button.dataset.reaction;
            const countElement = button.querySelector('.icon-reaction-count');
            const userHasReacted = reactions[reactionType]?.includes(currentUserId);

            // Update the counter inside the dropdown to the real count
            if (countElement) {
                countElement.textContent = reactions[reactionType]?.length || 0;
            }

            // Highlight the button if it's the current user's selected reaction
            if (userHasReacted) {
                button.classList.add('selected-reaction');
            } else {
                button.classList.remove('selected-reaction');
            }
        });
        
    }

    // --- Function to Populate the Page with Post Data ---
    // This function takes the fetched post object and updates all the relevant HTML elements.
    function populatePostData(post) {
        // Set the browsers tab's title to the post's title
        document.title = post.title; 

        // Set the main post image source and alt text
        if (postImage && post.imageUrl) {
            postImage.src = post.imageUrl;
            postImage.alt = post.title;
        }

        // Set author details using optional chaining (?.) for safety
        if (authorProfilePicture && post.author?.profilePictureUrl) {
            authorProfilePicture.src = post.author.profilePictureUrl;
            authorProfilePicture.alt = `${post.author.username}'s profile picture`;
        }
        if (authorUsername) {
            authorUsername.textContent = post.author?.username || 'Unknown Author';
        }

        // Format and set the post's creation date
        if (postDate) {
            const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
            postDate.textContent = `Posted on ${formattedDate}`;
        }

        // Set the main post title
        if (postTitle) {
            postTitle.textContent = post.title;
        }

        // Dynamically create and add hashtag list items 
        if (hashtagContainer && post.hashtags?.length > 0) {
            hashtagContainer.innerHTML = ''; // Clear any static/placeholder hashtags
            post.hashtags.forEach(tag => {
                const li = document.createElement('li');
                li.className = 'hashtag-background d-flex align-items-center';
                li.textContent = `#${tag}`;
                hashtagContainer.appendChild(li);
            });
        }

        // Set the Full Post Content.
        if (postContent) {
            // Using .innerHTML allows rendering if the content has HTML tags (like <p>, <b>)
            // If content is always plain text, .textContent is safer.
            postContent.innerHTML = post.content.replace(/\n/g, '<br>'); // Replace newlines with <br> tags
        }

        // After populating the main content, if we have an author,
        // fetch their other posts.
        if (post.author?._id) {
            fetchAndDisplayAuthorPosts(post.author._id);
        }

        // --- Update the Right Sidebar ---
        const sidebarAuthorPic = document.querySelector('#card-1-sidebar img');
        const sidebarAuthorName = document.querySelector('#card-1-sidebar p'); // This is a bit generic, an ID would be better
        const sidebarMoreFrom = document.querySelector('#card-2-sidebar h4 a');

        if (sidebarAuthorPic && post.author?.profilePictureUrl) {
            sidebarAuthorPic.src = post.author.profilePictureUrl;
        }
        if (sidebarAuthorName && post.author?.username) {
            sidebarAuthorName.textContent = post.author.username;
        }
        if (sidebarMoreFrom && post.author?.username) {
            sidebarMoreFrom.textContent = post.author.username;
        }

    }

    // --- Main Function to Fetch and Render ---
    async function fetchAndRenderPost() {
        try {
            // Make the GET request to our specific post endpoint, using the ID from the URL
            const response = await fetch(`/api/posts/${postId}`);

            // If the server responds with an error status (like 404 Post Not Found)
            if (!response.ok) {
                const errorInfo = await response.json();
                throw new Error(errorInfo.error?.message || 'Post not found.');
            }

            // If the response is OK, parse the JSON to get the post object
            const post = await response.json();

            // Call our function to populate the page with the data
            populatePostData(post);

            // Call the function to display the comments for this post
            fetchAndDisplayComments(post._id);

            // Call the function to handle all reaction UI
            updateReactionUI(post);

        } catch (error) {
            // Handle any errors from the fetch or from a non-ok response
            console.error('Falied to load post:', error);
            const contentSection = document.getElementById('post-content-section');
            if (contentSection) {
                contentSection.innerHTML = `<div class="alert alert-danger"><strong>Error:</strong> ${error.message}</div>`;
            }
        }
    }

    // This function will fetch and display the "More from..." posts
    async function fetchAndDisplayAuthorPosts(authorId) {
        // Select the container where the list items will go
        const moreFromContainer = document.getElementById('card-2-sidebar');
        if (!moreFromContainer) return; // Defensive check

        try {
            // Fetch the list of other posts by this author from our new API endpoint
            const response = await fetch(`/api/users/${authorId}/posts`);
            if (!response.ok) {
                throw new Error('Could not fetch author\'s post.');
            }
            const authorPosts = await response.json();

            // Select ALL static items that need to be removed.
            const staticItems = moreFromContainer.querySelectorAll('.more-from-item');
            
            // Loop through the list of found items and remove each one from its parent.
            staticItems.forEach(item => item.remove());

            // Check if the API returned any posts.
            if (authorPosts && authorPosts.length > 0) {
                authorPosts.forEach(authorPost => {
                    // Don't show the currently viewed post in the "More from" list
                    if (authorPost._id !== postId) { // 'postId' is from the outer scope where we get it from the URL.

                        const postItemDiv = document.createElement('div');
                        postItemDiv.className = 'more-from-item mt-3'; // Use the same class as your static items

                        // Hashtag logic
                        // Start with an empty string for the hashtags HTML
                        let hashtagsHtml = '';
                        // Check if the post has any hashtags
                        if (authorPost.hashtags && authorPost.hashtags.length > 0) {
                            // Use .map() to create a string for each tag, then .join() to combine them
                            const tagsString = authorPost.hashtags.map(tag => `<span>#${tag}</span>`).join('&nbsp;&nbsp;');
                            // Wrap the tags string in the <p> element from your static HTML
                            hashtagsHtml = `<p class="px-3 text-muted" style="font-size: 0.85rem;">${tagsString}</p>`;
                        }

                        // Populate the innerHTML with the correct structure and data.
                        postItemDiv.innerHTML = `
                            <a href="/view-post.html?id=${authorPost._id}" style="color: inherit; text-decoration: none;">
                                <p class="mb-1 px-3">${authorPost.title}</p>
                            </a>
                            ${hashtagsHtml}
                            `;
                        
                        // Append the new, complete item to the main container
                        moreFromContainer.appendChild(postItemDiv);
                    }
                });
            } else {
                // If the author has no other posts, display a message.
                const noPostsMessage = document.createElement('p');
                noPostsMessage.className = 'px-3 text-muted mt-3';
                noPostsMessage.textContent = 'No other posts from this author.';
                moreFromContainer.appendChild(noPostsMessage);
            }
        } catch (error) {
            console.error('Error fetching more posts by author:', error);
            // Optionally display a small error message in that sidebar card
            const moreFromContainer = document.getElementById('card-2-sidebar');
            if (moreFromContainer) {
                const staticItems = moreFromContainer.querySelectorAll('.more-from-item');
                staticItems.forEach(item => item.remove());
                moreFromContainer.innerHTML += '<p class="px-3 text-danger mt-3"><small>Could not load more posts.</small></p>'
            }
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

    // E) --- Event listener for submitting a new comment ---
    if (newCommentForm) {
        newCommentForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop the form from reloading the page

            const content = newCommentTextarea.value.trim();

            if (!content) {
                alert('Comment cannot be empty.');
                return;
            }

            // A quick auth check before submitting
            if (!token) {
                alert('You must be logged in to comment.');
                return;
            }

            const submitButton = newCommentForm.querySelector('button[type="submit"]');
            submitButton.disabled = true; // Disable button to prevent double submission

            try { 
                // Send the new comment to the backend API 
                const response = await fetch(`/api/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ content: content })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Failed to submit comment.');
                }

                // If successful, parse the new comment created returned by the server
                const { comment: newComment } = await response.json();

                // --- Real-time Update ---
                // Create the HTML element for the new comment
                const newCommentElement = createCommentElement(newComment);
                // Prepend it to the top of the list for an instant update feel
                commentsListContainer.prepend(newCommentElement);

                // Clear the textarea for the next comment
                newCommentTextarea.value = '';


                // Update the comment count in header
                if (commentCountSpan) {
                    commentCountSpan.textContent = parseInt(commentCountSpan.textContent, 10) + 1;
                }

                // Update the comment count in left sidebar
                if (sidebarCommentCount) {
                    sidebarCommentCount.textContent = parseInt(sidebarCommentCount.textContent, 10) + 1;
                }

                // If the "Be the first to comment" message was there, remove it
                const noCommentsMessage = commentsListContainer.querySelector('p');
                if (noCommentsMessage && noCommentsMessage.textContent.includes('Be the first to comment!')) {
                    noCommentsMessage.remove();
                }

            } catch (error) {
                console.error('Error submitting comment:', error);
                alert(`Error: ${error.message}`);
            } finally {
                submitButton.disabled = false; // Re-enable the button
            }
        });
    }



    // --- 4. INITIAL CALLS ON PAGE LOAD ---
    // Run any functions that need to execute once as soon as the page is ready.

    // 
    setupLikeListeners();

    // Call this function once to set the correct initial text for the company name.
    updatePromotedCompanyName();

    // Call this function once to set the correct element sized based on screen size.
    updateClassBasedOnWidth();

    // Call our main fetch function to make the page dynamic
    fetchAndRenderPost();

    // Add the call to set up the new listeners
    setupReactionListeners();
});




// THE BEST PRACTICE: ORGANIZE BY PURPOSE

// 1. AUTH GUARD
// 2. DOM ELEMENT SELECTION
// 3. FUNCTION DEFINITIONS
// 4. EVENT LISTENER ATTACHMENTS
// 5. INITIAL FUNCTION CALLS
