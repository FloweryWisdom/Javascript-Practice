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
