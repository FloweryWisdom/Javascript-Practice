/* A R R O W  F U N C T I O N S   &   S T R I N G  M E T H O D S */

/* H O M E W O R K : */

/* 1. CREATE A PROGRAM THAT PRINTS THE FIRST LETTERS OF THE COMPLETE NAME OF A USER:
    I.E.: "Chuchin Sanchez Garcia" -> "CSG" 

*/

function getInitials(fullName) {
    //Split the string into an array of words
    const words = fullName.split(' ')

    //Initialize an empty string to store the initials of the words
    let initials = ''

    //Iterate over the array of words
    for (let i = 0; i < words.length; i++) {
        //Add the first letter of each word to the initials string
        initials += words[i].charAt(0).toUpperCase()
    }
    return initials
}

console.log(getInitials("Chuchin Gomez Bufalongas"))

/* 2. CREATE A PROGRAM THAT PRINTS THE CHARACTER IN A GIVEN INDEX OF A STRING: */

const myString = "The Quick Brown Fox Jumps Over The Lazy Dog"


function findCharacter(string, index) {
    if (index >= 0 && index < string.length) {
        return `The character at ${index} is ${string.charAt(index)}`
    } else {
        return "Error: The index is out of bounds"
    }
}

console.log(findCharacter(myString, 10))

/* 3. CREATE A FUNCTION TO CHECK IF A STRING CONTAINS A SPECIFIC SUBSTRING */
function containsSubString(string, substring) {
    if (string.includes(substring)) {
        return`${substring} is within the string.`
    } else {
        return `"${substring}" is not within the string.`
    }
}

console.log(containsSubString(myString, "dog"))

/* 4. CREATE A FUNCTION TO COUNT THE NUMBER OF CHARACTERS IN A STRING: */

function countChars(string) {
    return `The string has ${string.length} characters`
}

console.log(countChars(myString))

/* 5. CREATE A FUNCTION TO REPLACE SUBSTRINGS IN A STRING: */
function replaceSubString(string, target, replacement) {
    return string.replace(new RegExp(target, "g"), replacement)
}

console.log(replaceSubString(myString, "The", "A"))
