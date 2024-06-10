const numbersArray = [12, 26, 15, 78, 26, 47];
const countriesArray = ["México", "Canadá", "Brasil", "España"];
const peopleArray = [
  {
    gender: "female",
    name: {
      title: "Mrs",
      first: "Axelle",
      last: "Fleury",
    },
    nat: "FR",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Melati",
      last: "Oort",
    },
    nat: "NL",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Inés",
      last: "Vargas",
    },
    nat: "ES",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Marcus",
      last: "Garrett",
    },
    nat: "GB",
  },
  {
    gender: "female",
    name: {
      title: "Mrs",
      first: "Vasilina",
      last: "Motrichko",
    },
    nat: "UA",
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Leuntje",
      last: "Van Harmelen",
    },
    nat: "NL",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Tristan",
      last: "Gauthier",
    },
    nat: "FR",
  },
  {
    gender: "female",
    name: {
      title: "Madame",
      first: "Marianne",
      last: "Charles",
    },
    nat: "CH",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Maksim",
      last: "Bunechko",
    },
    nat: "UA",
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Coline",
      last: "Mathieu",
    },
    nat: "FR",
  },
];
 
/* 1. USING THE NUMBERS FROM THE ARRAY ABOVE, PROIVDE THE TOTAL SUM OF THE ARRAY*/

function sumArray(array) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    return sum
}

console.log(sumArray(numbersArray))

/* 2. USING THE NUMBERS FROM THE ARRAY ABOVE, OBTAIN A LIST OF ALL THE EVEN NUMBERS */

function getEvenNumbers(array) {
    const evenNumbers = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            evenNumbers.push(array[i])
        } else {
            null
        }
    }
    return evenNumbers
}

console.log(getEvenNumbers(numbersArray))

/* 3. USING THE NUMBERS FROM THE ARRAY ABOVE, OBTAIN A LIST OF ALL THE ODD NUMBERS */

function getOddNumbers(array) {
    const oddNumbers = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            null
        } else {
            oddNumbers.push(array[i])
        }
    }
    return oddNumbers
}

console.log(getOddNumbers(numbersArray))

/* 4. USING THE COUNTRIES LIST ARRAY ABOVE, I NEED TO GET A STRING THAT CONTAINS JUST THE FIRST LETTER OF EACH COUNTRY */

function getFirstLetterOfCountries(array) {
    let firstLetterString = ""
    for (let i = 0; i < array.length; i++) {
        firstLetterString += array[i].charAt(0)
    }
    return firstLetterString
}

console.log(getFirstLetterOfCountries(countriesArray))

/* 5. USING THE COUNTRIES LIST ARRAY ABOVE, I NEED TO GET A NEW ARRAY WITH CAPITALIZED COUNTRIES */
function capitalizeCountries(array) {
  let capitalizedCountries = []
  for (let i = 0; i < array.length; i++) {
    capitalizedCountries.push(array[i].toUpperCase())
  }
  return capitalizedCountries
}

console.log(capitalizeCountries(countriesArray))

/* 6. USING THE PEOPLE LIST ARRAY ABOVE, I NEED TO GET A NEW ARRAY WITH THE COMPLETE NAME OF EACH PERSON */

function getCompleteNames(array) {
  let completeNames = []
  for (let i = 0; i < array.length; i++) {
    completeNames.push(array[i].name.first + " " + array[i].name.last)
  }
  return completeNames
}

console.log(getCompleteNames(peopleArray))

/* 7. USING THE PEOPLE LIST ARRAY ABOVE, I NEED TO OBTAIN A NAME LIST OF ALL THE PEOPLE BELONGING TO A SPECIFIC NATIONALITY */
function getPeopleByNationality(array, nationality) {
  let peopleByNationality = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].nat === nationality) {
      peopleByNationality.push(array[i].name.first)
    }
  if (peopleByNationality.length === 0) {
    return "There are no people"}
  }
  return peopleByNationality
}

console.log(getPeopleByNationality(peopleArray, "MX"))