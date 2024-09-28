// Import the fetch method: 
import { fetchUserByKey } from "./fetchMethods.js";

// Add an event listener to the "Home" button to redirect to the home page
document.getElementById("homeButton").addEventListener("click", () => {
    window.open("../index.html", "_self");
})



console.log(location);
console.log(window.location.search);

// Function to get the query parameters from the URL: 
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the user key from the URL: 
const userKey = getQueryParam("userKey");



// Fetch the user data from Firebase and populate the UI: 
if (userKey) {
    fetchUserByKey(userKey).then((data) => {
        if (data) {
            document.getElementById("username").innerText =`${data.username}`;
            document.getElementById("aboutMe").innerText = `${data.aboutMe}`;
            document.getElementById("profilePicture").src = `${data.profilePicture}`;
            document.getElementById("firstName").innerText = `${data.firstName}`;
            document.getElementById("lastName").innerText = `${data.lastName}`;   
        } else {
            console.error("No user data found for the given user key.");
        }
    })
    

} else {
    console.error("User ID not found in the URL.");
}

   