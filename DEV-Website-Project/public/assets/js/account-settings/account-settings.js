document.addEventListener('DOMContentLoaded', async () => {

    // --- Auth Guard ---
    // First, check if a token exists. If not, redirect to login immediately.
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // --- Select all your form input elements --.
    const settingsForm = document.getElementById('settingsForm');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const displayEmailCheck = document.getElementById('displayEmailCheck');
    const userUsernameInput = document.getElementById('userUsername');
    const userProfileImageDisplay = document.getElementById('userProfileImage');
    const userDisplayedProfileImage = document.getElementById('displayedProfileImage');
    const userWebsiteInput = document.getElementById('userWebsite');
    const userLocationInput = document.getElementById('userLocation');
    const userBioInput = document.getElementById('userBio')
    const userSkillsInput = document.getElementById('userSkills')
    const userWorkInput = document.getElementById('userWork');
    const userEducationInput = document.getElementById('userEducation');

    // --- Function to pre-fill the form with existing user data ---
    async function populateForm() {
        try {
            // Fetch the current user's data from our new '/api/users/me' endpoint
            const response = await fetch('/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Could not load user data.');
            }

            const { user } = await response.json();

            // Populate the profile image display
            if (userDisplayedProfileImage && user.profilePictureUrl) {
                userDisplayedProfileImage.src = user.profilePictureUrl;
            }

            // Populate each form field with the data from the database
            userNameInput.value = user.name || '';
            userEmailInput.value = user.email || '';
            userUsernameInput.value = user.username || '';
            displayEmailCheck.checked = user.displayEmail || false;
            userWebsiteInput.value = user.websiteUrl || '';
            userLocationInput.value = user.location || '';
            userBioInput.value = user.bio || '';
            userSkillsInput.value = user.skills || '';
            userWorkInput.value = user.work || '';
            userEducationInput.value = user.education || '';
        
        } catch (error) {
            console.error('Failed to load user settings:', error)
            alert(`Error: ${error.message}`);
        }
    }           

    // --- Handle Form Submission ---
    settingsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Create an object with the updated data from the form fields
        const updatedData = {
            name: userNameInput.value,
            displayEmail: displayEmailCheck.checked,
            profilePictureUrl: userProfileImageDisplay.value.trim(),
            bio: userBioInput.value,
            location: userLocationInput.value,
            websiteUrl: userWebsiteInput.value,
            work: userWorkInput.value,
            education: userEducationInput.value,
            skills: userSkillsInput.value,
        };

        try {
            const response = await fetch('/api/users/me', {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData) 
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                // Optionally redirect or just show a success message
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Update failed.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Error: ${error.message}`);
        }
    });

    // --- Initial Call ---
    // Call the function to fill the form when the page loads
    populateForm();


})