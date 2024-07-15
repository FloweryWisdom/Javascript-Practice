// D O C U M E N T   O B J E C T   M O D E L


let koders = ["Azael", "May", "Christian", "Manuel", "Eddy",];

/*DOM elements creation Methods */


// 1. createElement uses the name of the element as the argument
let koderListItem = document.createElement("li");

//2. createTextNode uses a string as the argument
let koderItemText = document.createTextNode("Hello World!");

//3. appendchild adds an element or node to the argument
koderListItem.appendChild(koderItemText);

console.log(koderListItem);
console.log(koderItemText);

let heading = document.createElement("h1");
let headingText = document.createTextNode("Modulo de JS");
heading.appendChild(headingText);

console.log(heading);

let paragraph = document.createElement("p");
let paragraphText = document.createTextNode("Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque rem molestias at quasi itaque, hic repellat deserunt accusamus nisi dolores obcaecati, officiis officia, alias ex molestiae? Reprehenderit, doloremque dignissimos!");
paragraph.appendChild(paragraphText);

console.log(paragraph);

let section = document.createElement("section");
let p = document.createElement("p");
let pText = document.createTextNode("some text.");

p.appendChild(pText);
section.appendChild(p);
console.log(section);


/* Metodos de seleccion de DOM */ 

// 1. getElementById uses the id of the element as the argument
let kodersList = document.getElementById("koders-list");
console.log(kodersList);

kodersList.appendChild(koderListItem);


function createKoderListItem(content) {
    // 1. createElement uses the name of the element as the argument
    let koderListItem = document.createElement("li");

    //2. createTextNode uses a string as the argument
    let koderItemText = document.createTextNode(content);
    koderListItem.appendChild(koderItemText);
    return koderListItem;
}

const printKodersList = (kodersArray, listId) => {
    let kodersList = document.getElementById(listId);
    kodersArray.forEach((koder) => {
        let listItem = createKoderListItem(koder);
        kodersList.appendChild(listItem);
    })
}