let milaneso = {
    raza: "Chihuahua",
    color: "Cafe",
    tamanio: "Pequeño",
    peso: "2kg",
};

console.log(milaneso);
console.log(milaneso.raza);


//--- O B J E T O S   &   TIPOS DE VALORES ---

// let milaneso = {
//   raza: "Chihuahua",
//   color: "Café",
//   tamanio: "Pequeño",
//   peso: "Ligero",
// };

// console.log(milaneso);
// console.log(milaneso.raza);
// console.log(milaneso.tamanio);

// milaneso.color = "negro";

// console.log(milaneso);

// milaneso.nombre = "Milaneso";
// milaneso.estaVacunado = true;
// milaneso.edadEnAnios = 5;
// milaneso.listaDeVacunas = ["Parvovirus", "quintuple"];
// milaneso.duenio = {
//   nombre: "Ferras",
//   telefono: 5543829674,
//   direccion: {
//     calle: "San simon",
//     numero: 7,
//     colonia: "San marcos",
//   },
// };

// console.log(milaneso);
// console.log(milaneso.duenio /*{}*/);
// console.log(milaneso.duenio.nombre);
// console.log(milaneso.duenio.direccion.colonia);

const perro = {
    name: "tyson",
  };
  
  perro.breed = "Pitbull";
  
  console.log(perro);
  
  
  // let a = 7;
  // let b = 5;
  // let result = a + b;
  
  // let c = 2;
  // let d = 6;
  // let test2 = c + d;
  
  // let e = 5;
  // let f = 16;
  // let result3 = e + f;
  
  function sumarDosNumeros(a, b) {
      /*definición de una función*/
      //   let a=2;
      //   let b=5;
      let result = a + b;
    
      return result;
    }
    
    let resultadoSuma1 = sumarDosNumeros(2, 5); /*7*/
    
    console.log(resultadoSuma1);

/* 1. CREATE FUNCTIONS THAT DO THE FOLLOWING: */
    
//ADD TWO NUMBERS: 
function addTwoNumbers(a, b) {
    const result = a + b;
    return result;
}

//SUBTRACT TWO NUMBERS: 
function subtractTwoNumbers(a, b) {
    const result = a - b;
    return result;
}

//MULTIPLY TWO NUMBERS:
function multiplyTwoNumbers(a, b) {
    const result = a * b;
    return result;
}

//DIVIDE TWO NUMBERS:
function divideTwoNumbers(a, b) {
    const result = a / b;
    return result;
}

console.log(subtractTwoNumbers(5, 2));

/* 2. CREATE A FUNCTION THAT RETURNS THE COMPLETE NAME OF A USER: */

function returnFullName(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    return fullName;
}


/* 3. CREATE A FUNCTION THAT RECEIVES THE FOLLOWING PROPERTIES (THE FUNCTION MUST RETURN AN OBJECT): 
    • NAME
    • COLOR
    • SIZE
    • WEIGHT
    • BREED
*/

function createAnimal(name, color, size, weight, breed) {
    const animal = {
        name,
        color,
        size,
        weight,
        breed,
    }
    return animal;
}

console.log(createAnimal("Levi", "Brown", "Small", "2kg", "Chihuahua"));


/* 4. CREATE A PROGRAM THAT RECEIVES A NAME & DOES THE FOLLOWING: 

    • IF THE NAME HAS 8 CHARACTERS OR MORE, RETURN "The name has more than 8 characters."
    • IF THE NAME HAS LESS THAN 8 CHARACTERS, RETURN "The name has less than 8 characters."
*/

function checkNameLength(name) {
    if (name.length >= 8) {
        console.log(`The name: ${name} has 8 characters or more.`)
    } else if (name.length < 8) {
        console.log(`The name: ${name} has less than 8 characters.`)
    }
}

checkNameLength("Milaneso")

/* 5. CREATE A FUNCTION THAT EVALUATES TWO NUMBERS BASED ON THE FOLLOWING CONDITIONS:

    • IF THE NUMBER IS EVEN, RETURN "Your number is even."
    • IF THE NUMBER IS ODD, RETURN "Your number is odd."
*/

function evaluateNumbers(a, b) {
    if (a % 2 === 0) {
        console.log(a, " is an even number.")
    } else {
        console.log(a, " is an odd number.")
    }

    if (b % 2 === 0) {
        console.log(b, " is an even number.")
    } else {
        console.log(b, " is an odd number.")
    }
}

evaluateNumbers(5, 8);

/* 6. CREATE A FUNCTION THAT EVALUATES A NAME AND LAST NAME & COMPUTES THE NUMBER OF CHARACTERS IN BOTH SRINGS: 
*/
function countCharacters(firstName, lastName) {
    const characterCount = firstName.length + lastName.length;
    console.log(`The total number of characters in the name and last name is: ${characterCount}`)
}

countCharacters("Milaneso", "Perez")

/* 7. OBTAIN THE FIRST NAME OF THE ARRAY: */

function getFirstName(array) {
    return nameList[0]
}

const nameList = ["Milaneso", "Ferrari", "Perez", "Gonzales"]

console.log(getFirstName(nameList))