// DOM Selection Methods in JavaScript: 

/* 1. getElementById() 
This method is used to obtain a DOM element whose ID attribute matches the specified string.
Returns only 1 DOM element. */
function changeHeaderName(Id) {
    let heading = document.getElementById(Id);
    heading.innerText = "Hello World!";
    return heading;
}

/* 2. getElementsByClassName()  
This method is used to obtain all DOM elements whose class name attribute matches the specified string.
Returns an HTML Collection object. */
function getAllClassElements(className) {
    let elements = document.getElementsByClassName(className);
    console.log(elements);
}

/* 3. getElementByTagName()
This method is used to obtain all DOM elements whose tag name attribute matches the specified string.
Returns an HTML Collection object.*/
function getAllTagElements(tagname) { 
    let elements = document.getElementsByTagName(tagname);
    console.log(elements);
}


/* 4. document.querySelector(cssSelector) 
This method is used to select the first element that matches a CSS selector.
This method only returns 1 DOM element. */


/* 5. document.querySelectorAll(cssSelector)
This method is used to select all elements that match the CSS selector.
This method returns a NodeLIst. */


//NOTES: Please check difference between HTML Collection, single DOM elements and NodeList.
// Also, check the data type that each method returns. 


kodersList = [
    {
        name: "Fernanda",
        lastname: "Palacios",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    },
    {
        name: "Jorge",
        lastname: "Ochoa",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    },
    {
        name: "Naomi",
        lastname: "Puertos",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    },
    {
        name: "Rurick",
        lastname: "Maqueo",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    },
    {
        name: "Charles",
        lastname: "Silva",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    },
    {
        name: "Michael",
        lastname: "Villalba",
        scores: {
            html: 9,
            css: 10,
            js: 9
        },
        generation: 10,
    }
]


// 1. Create a function to print a list element for each object in the 'kodersList' array.
// The list element should contain the first and last name of the koder.

function printKodersList(array) {
    const listContainer = document.getElementById('koders-list');

    array.forEach(koder => {
        const listItem = document.createElement('li');

        listItem.innerText = `${koder.name} ${koder.lastname}`;
        listContainer.appendChild(listItem);
    })
}

//printKodersList(kodersList);

// 2. Create a function to change the background color of the list element 'li' that is odd.

function changeBackgroundColor() {
    const kodersArray = document.querySelectorAll("#koders-list li");

    kodersArray.forEach((koder, index) => {
        if ((index + 1) & 2 !== 0) {
            koder.classList.add("bg-success");
        }
    })
}

//changeBackgroundColor();

// 3. Create a new list that contains the complete name and average score of each koder.
// If the average is less than 9.5 the text color should be yello, and green if it-s greater than or equal.

function printKodersListWithAverage(array) {
    const listContainer = document.getElementById('koders-list');

    array.forEach(koder => {
        const listItem = document.createElement('li');
        const fullName = `${koder.name} ${koder.lastname}`;
        const average = ((koder.scores.html + koder.scores.css + koder.scores.js) / 3).toFixed(2);
        listItem.innerText = `${fullName} : ${average}`;
        listContainer.appendChild(listItem);
    })
}

//printKodersListWithAverage(kodersList);

