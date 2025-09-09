import { createPostCard } from '../utils/render.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- Get the User ID from the URL ---
    // This assumes your links to the profile page will be like /profile-page.html?id=USER_ID
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        document.body.innerHTML = '<h1>User not found.</h1>';
        return;
    }

    // --- Select all the profile page elements ---
    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileJoinedDate = document.getElementById('profile-joined-date');
    const profileEducation = document.getElementById('profile-education');
    const profileEmailContainer = document.getElementById('profile-email-container');
    const profileEmail = document.getElementById('profile-email');
    const profileWork = document.getElementById('profile-work');
    const postsContainer = document.getElementById('profile-posts-container');
    const profileSkills = document.getElementById('profile-skills');
    const statsPosts = document.getElementById('stats-posts');
    const statsComments = document.getElementById('stats-comments');
    // Select other elements as needed...

    // --- Main fetch and render function ---
    async function fetchAndRenderProfile() {
        try {
            // --- Fetch profile data and posts data concurrently ---
            const [userResponse, postsResponse ] = await Promise.all([
                fetch(`/api/users/${userId}`), // Fetch user's public profile (now with counts)
                fetch(`/api/users/${userId}/posts`) // Fetch user's posts
            ]);

            // Check if both requests were successful before proceeding
            if (!userResponse.ok) throw new Error('Could not load user profile.');
            if (!postsResponse.ok) throw new Error('Could not load user profile.');
            
            // Parse the JSON from both responses
            const user = await userResponse.json();
            const posts = await postsResponse.json();

            // --- Populate the profile card with user data ---
            document.title = `${user.name} (@${user.username})`;
            profileAvatar.src = user.profilePictureUrl || './assets/images/home/main/profile-picture-6.webp';
            profileName.textContent = user.name;
            profileBio.textContent = user.bio;
            profileSkills.textContent = user.skills;
            profileEducation.textContent = user.education;
            profileWork.textContent = user.work;
            profileJoinedDate.textContent = new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
            // (You can alos populate other fields like github link, etc.)

            // --- Populate the stats card using new data from the user object
            if (statsPosts) {
                // Use the postCount from the user object
                statsPosts.textContent = `${user.postCount} post${user.postCount !== 1 ? 's' : ''} published`;
            }

            if (statsComments) {
                // Use the commentCount from the user object
                statsComments.textContent = `${user.commentCount} comment${user.commentCount !== 1 ? 's' : ''} written`;
            }

            // --- Conditionally display the email ---
            // The API response will ONLY include the email if user.displayEmail is true
            if (user.email) {
                profileEmail.textContent = user.email;
            } else {
                profileEmailContainer.innerHTML = '';
            }

            // --- Populate the posts feed ---
            postsContainer.innerHTML = ''; // Clear any static content
            if (posts.length > 0) {
                posts.forEach(post => {
                    // Reuse your createPostCard function from home.js if you moved it to a shared file!
                    const postCard = createPostCard(post); // Assuming createPostCard exists 
                    postsContainer.appendChild(postCard);
                });
            } else {
                postsContainer.innerHTML = '<p>This user hasn\'t published any posts yet.</p>';
            }
        } catch (error) {
            console.error('Failed to render profile page:', error);
            document.querySelector('.container').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    // A placeholder for your createPostCard function - you should move the real one to a shared file
    fetchAndRenderProfile();
})