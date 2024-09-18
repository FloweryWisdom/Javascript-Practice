// Class Assignments 

// 1. Create a button. The button should have the following:

// • Styling from Bootstrap and/or custom CSS.

// • A click event listener.
// • The text of the button should change to 'Deactivate' when clicked.
// • Invert the color of the background and text color when clicked.
// • The button should return to its original state when click again and so on.  

// Step 1: Get the button element from the DOM and store it in a variable
const button = document.getElementById('button-1');

// Step 2: Create function to toggle the button state
function toggleButton() {
    if (button.textContent === 'Activate') {
        button.textContent = 'Deactivate';
        button.style.backgroundColor = 'black';
        button.style.color = 'rgb(155, 155, 155)';
        button.style.borderColor = 'rgb(155, 155, 155)';
    } else {
        button.textContent = 'Activate';
        button.style.backgroundColor = 'rgb(155, 155, 155)';
        button.style.color = 'black'; 
        button.style.borderColor = 'black';
    }
}

// Step 3: Add a click event listener to the button that calls the 'toggleButton' function
button.addEventListener('click', toggleButton); 


// 2. Create a column and checkbox containing 5 buttons. The column should have the following: 

// • Styling from Bootstrap and/or custom CSS.
// • The buttons should have active and inactive states. 
// • The checkbox should toggle all buttons between active and inactive states.

// Step 1: Get the checkbox element from the DOM and store it in a variable
const checkbox = document.getElementById('checkbox-switch-test');

// Step 2: Get the buttons from the DOM and store them in a variable
const buttons = document.querySelectorAll("#buttons-container .btn");

// Step 3: Create a function to toggle the buttons state

function toggleButtons(buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        if (checkbox.checked) {
            buttonsArray[i].textContent = 'Deactivate';
            buttonsArray[i].classList.remove('activeButtonState');
            buttonsArray[i].classList.add('inactiveButtonState');
        } else {
            buttonsArray[i].textContent = 'Activate';
            buttonsArray[i].classList.remove('inactiveButtonState');
            buttonsArray[i].classList.add('activeButtonState');
        }
    }
}

// Step 4: Add a click event listener to the checkbox that call the 'toggleButtons' function
checkbox.addEventListener('click', () => toggleButtons(buttons));


// Homework Assignments

// 1. Add a create a comment and comments list section. The comment section should have the following: 
// • Add styling using Bootstrap and/or custom CSS
// • The create a comment section requires author, title, and comment field
// • The comments list will display all comments
// • Create a delete button for each comment
// • Add a timestamp to each comment as their id to be used for deletion
// • Add an edit button for each comment
// • The edit button should populate the create a comment section with the comment details
// • The edit button should change the text of the submit button to 'update'
// • The update button should update the comment details in the comments list


// 1. CREATE A COMMENT SECTION


// Initialize the comments array
let comments = []

// Create a function to create a comment box
function createCommentBox(commentData) {
    let {author, comment, id} = commentData;

    let card = document.createElement('div');
    card.classList.add("card", "mb-3");

    let cardBody = document.createElement('div');
    cardBody.classList.add("card-body");

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerText = 'Delete';

    deleteButton.addEventListener('click', async () => {
        await deleteComment(id); // Delete from Firebase
        await printCommentsFromFirebase(); // Re-fetch and print the update comments
    })

    let cardText = document.createTextNode(`${author} : ${comment}`);

    cardBody.append(cardText, deleteButton);
    card.append(cardBody);

    return card;

}

// Create a function to print the comments
function printComments(commentsArray) {
    let wrapper = document.getElementById('comment-wrapper');
    wrapper.innerHTML = '';

    commentsArray.forEach(comment => {
        let commentBox = createCommentBox(comment);
        wrapper.append(commentBox);
    }) 
}

// Fetch comments from Firebase and print them
async function printCommentsFromFirebase() {
    const comments = await fetchComments(); // Fetch comments from Firebase
    printComments(comments); // Print the comments to the DOM 
}


//initialize the form data object for console logging purposes (testing)
let formData = {
    author: '',
    comment: ''
}

//adding event listeners to the input fields (testing)
document.querySelectorAll("#comment-form input, #comment-form textarea").forEach((input) => {input.addEventListener("keyup", (event) => {
        let value = event.target.value; 
        let property = event.target.name;
        console.log(`${property} : ${value}`);
        formData[property] = value;
        console.log(formData);
    })
})

// Create a function to reset the form fields after submitting a comment
function resetForm(className) {
    let fields = document.querySelectorAll(`${className}`);
    fields.forEach((field) => { field.value = ''})
}


// Create an event listener to button to save the comment
document.getElementById('save-comment').addEventListener('click', async (event) => {
    //create a new object for each comment
    let newComment = {
        author: document.querySelector('#comment-form input').value,
        comment: document.querySelector('#comment-form textarea').value,
    }
    
    // Save the new comment to Firebase
    await createComment(newComment);

    // Re-fetch and print the updataed comments from Firebase
    await printCommentsFromFirebase();

    // Reset the form fields
    resetForm('.form-control');
})



// 2. ADD HTTP METHODS TO THE ABOVE COMMENT SECTION 

// Create a comment (POST): 

async function createComment(newComment) {
    let response = await fetch('https://javascript27g-a4df9-default-rtdb.firebaseio.com/comments/.json', {
        method: 'POST',
        body: JSON.stringify(newComment),
    });
    let data = await response.json();
    return data;
}


// Read/Fetch all comments (GET): 

async function fetchComments() {
    let response = await fetch('https://javascript27g-a4df9-default-rtdb.firebaseio.com/comments/.json')
    let data = await response.json();

    let commentsArray = [];
    for (let key in data) {
        commentsArray.push({ id: key, ...data[key] }); // Use Firebase's key as "id"
    }
    return commentsArray;
}


//Delete a comment (DELETE): 
async function deleteComment(id) {
    try {
        const response = await fetch(`https://javascript27g-a4df9-default-rtdb.firebaseio.com/comments/${id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        console.log('Comment deleted succesfully.');
    } catch (error) {
        console.error(error); 
    }
}



// Fetch and display comments when the page loads
window.onload = async () => {
    await printCommentsFromFirebase();
};

// N O T E S : 

// 1. What is the difference between 'append.' and 'appendChild.'? 

