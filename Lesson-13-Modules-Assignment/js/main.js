// Create a function to save a new user to the database: 

async function saveUserData(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Collect the user data from form
    let userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        username: document.getElementById("username").value,
        profilePicture: document.getElementById("profilePicture").value,
        aboutMe: document.getElementById("aboutMe").value,
    }

    try {
        // Save the new user to Firebase
        const result = await createUser(userData);
        console.log("User created succesfully: ", result);

        // Reset the form fields
        resetForm("#userRegistrationForm");

        // Optionally, show a succes message to the user
        alert("User registered successfully!");
    } catch (error) {
        console.error("Error saving data: ", error);
        // Optionally, show an error message to the user
        alert("An error occurred while registering the user. Please try again.");
    }
}


// Create a new user (POST requet):
async function createUser(userData) {
    let response = await fetch("https://javascript27g-a4df9-default-rtdb.firebaseio.com/users/.json", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();   
}




// Create a function to reset the form fields: 
function resetForm(formSelector) {
    const form = document.querySelector(formSelector);
    form.reset();

    // Reset the profile picture preview to the default image
    const profilePicturePreview = document.getElementById("profilePicturePreview");
    profilePicturePreview.src = "https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw"
}


// Add an event listener to the save user button: 

document.getElementById("userRegistrationForm").addEventListener("submit", saveUserData);

// Add an event listener to the "View all users" button to redirect to the users page: 
document.getElementById("viewUsersButton").addEventListener("click", () => {
    window.open("views/userList.html", "_self");
})

// Dynamically update profile picture preview when the user enters a URL:
document.getElementById("profilePicture").addEventListener("input", function () {
    let imageUrl = this.value; // Get the URL from the input field
    let profilePicturePreview = document.getElementById("profilePicturePreview");
    profilePicturePreview.src = imageUrl; // Set the src attribute of the image to the URL

    // If the image URL is broken, fallback to a default image
    profilePicturePreview.onerror = function () {
        // Show an alert if the image URL is invalid
        alert("Invalid URL. Please provide a valid image URL.");
        this.src = `https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw`
    }
})