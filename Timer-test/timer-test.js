// timer-test.js

// 1. Select the elements we need
const searchInput = document.getElementById('searchInput');
const outputDiv = document.getElementById('output');

// 2. Declare a variable to hold the timer ID.
//    It starts with no value (it will be null or undefined).
let timerId = null;

// 3. Listen for the 'input' event (every keystroke).
searchInput.addEventListener('input', () => {
    // Get the current text from the input box.
    const query = searchInput.value;
    console.log(`--- Keystroke detected: "${query}" ---`);

    // 4. Clear the PREVIOUS timer.
    //    The first time this runs, timerId is null, and clearTimeout(null) does nothing.
    //    On every subsequent keystroke, it cancels the timer set by the previous keystroke.
    console.log(`Clearing previous timer with ID: ${timerId}`);
    clearTimeout(timerId);

    // 5. Set a NEW timer.
    //    setTimeout will run the function after 500ms, AND it returns a new, unique ID
    //    which we immediately store in our timerId variable.
    timerId = setTimeout(() => {
        // This function only runs if the timer was NOT cleared by a subsequent keystroke.
        console.log(`%c--> Timer ${timerId} finished! Simulating API call for "${query}"`, 'color: green; font-weight: bold;');
        outputDiv.textContent = `Searched for: ${query}`;
    }, 500); // Wait 500 milliseconds

    // Log the ID of the new timer we just created.
    console.log(`New timer set with ID: ${timerId}`);
});