// Add an event listener to the "Home" button to redirect to the home page
document.getElementById("homeButton").addEventListener("click", () => {
    window.open("../index.html", "_self");
})


// Initialize the users array
let users = [];

// Create a function to create user card
function createUserCard(userData, userKey) {

    // Destructure the userData object
    let { profilePicture, username, firstName, lastName } = userData;

    // Create the card element
    let card = document.createElement("div");
    card.classList.add("row", "mt-2", "mb-2", "bg-secondary-subtle", "border", "border-secondary", "border-1", "rounded-3", "mb-2", "p-2");
    
    // Add hover effect to the card
    card.style.cursor = "pointer";

    // Create the image div
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("col");

    // Create the image element and set their attributes
    let image = document.createElement("img");
    image.src = profilePicture;
    image.classList.add("img-thumbnail", "rounded-circle", "mx-auto", "d-block");
    image.style.height = "5rem";
    image.style.width = "5rem";

    // Append the image to the imageDiv
    imageDiv.appendChild(image);

    // Create the name div
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("col", "d-inline-flex", "align-items-center");

    // Create the name label
    let nameLabel = document.createElement("p");
    nameLabel.classList.add("mb-0");

    // Added strong tag to the name label
    let nameLabelStrong = document.createElement("strong");
    nameLabelStrong.textContent = "Name: ";

    // Append the strong tag to the nameLabel
    nameLabel.appendChild(nameLabelStrong);

    // Append the nameLabel to the nameDiv
    nameDiv.appendChild(nameLabel);

    // Create the name paragraph element
    let name = document.createElement("p");
    name.classList.add("mb-0");

    // Concatenate the first and last name
    name.innerText = `${firstName} ${lastName}`;

    // Append the name to the nameDiv
    nameDiv.appendChild(name);

    // Create the username div
    let usernameDiv = document.createElement("div");
    usernameDiv.classList.add("col");

    // Create the username
    let usernameName = document.createElement("h5");
    usernameName.classList.add("card-title", "text-center", "mt-4");
    usernameName.innerText = username;

    // Append the usernameName to the usernameDiv
    usernameDiv.appendChild(usernameName);

    // Append the imageDiv, nameDiv and usernameDiv to the card
    card.appendChild(imageDiv);
    card.appendChild(nameDiv);
    card.appendChild(usernameDiv);

    // Add a click event listener to redirect to the user detail page
    card.addEventListener("click", (event) => {
        console.log(event.target);
        console.log(userKey);
    })


    return card;
}

// Create a function to print the user list
function printUsersList(usersDataArray) {
    // Get the users list container
    let usersListContainer = document.getElementById("usersListContainer");

    // Clear the users list container
    usersListContainer.innerHTML = "";

    // Iterate over the usersDataArray
    usersDataArray.forEach(user => {
        // Create a user card
        let userCard = createUserCard(user, user.id);
        // Append the user card to the usersListContainer
        usersListContainer.appendChild(userCard);
    });
}

// Fetch users from Firebase and print them
async function printUsersFromFirebase() {
    const fetchedUsers = await fetchUsers(); // Fetch users from Firebase
    printUsersList(fetchedUsers); // Print the users to the DOM
}

// Fetch Users from Firebase
async function fetchUsers() {
    let usersArray = [];

    try {
        let response = await fetch("https://javascript27g-a4df9-default-rtdb.firebaseio.com/users/.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("HTTP error! Status : " + response.status);
        }

        let data = await response.json();
        console.log(data);

        for (let key in data) {
            usersArray.push({ id: key, ...data[key] });
        }

    } catch (error) {
        console.log(error);
    }

    return usersArray;
}

// Fetch and display the users when the page loads
window.onload = async () => {
    await printUsersFromFirebase();
}

