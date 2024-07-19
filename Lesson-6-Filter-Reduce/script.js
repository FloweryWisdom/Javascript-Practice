const todosArray = [
  {
    title: "todo 1",
    priority: 0,
    completed: true,
  },
  {
    title: "todo 2",
    priority: 0,
    completed: false,
  },
  {
    title: "todo 3",
    priority: 1,
    completed: false,
  },
  {
    title: "todo 4",
    priority: 5,
    completed: false,
  },
  {
    title: "todo 5",
    priority: 3,
    completed: false,
  },
  {
    title: "todo 6",
    priority: 2,
    completed: true,
  },
  {
    title: "todo 7",
    priority: 0,
    completed: false,
  },
  {
    title: "todo 8",
    priority: 0,
    completed: true,
  },
  {
    title: "todo 9",
    priority: 0,
    completed: false,
  },
  {
    title: "todo 10",
    priority: 0,
    completed: true,
  },
];

let nationalities = [
  "MX",
  "IE",
  "DE",
  "UA",
  "GB",
  "AU",
  "NO",
  "AU",
  "IE",
  "FR",
  "MX",
  "GB",
  "IE",
];


let singleNats = nationalities.reduce((accum, curr) => {
  return accum.includes(curr) ? accum : [...accum, curr];
}, []);
  
console.log(singleNats);


// Let's simplify the code above:
function filterByUniqueNationalities(nationalities) {
  uniqueNats = {}
  for (let i = 0; i < nationalities.length; i++) {
    let nat = nationalities[i]
    if (uniqueNats[nat]) {
      uniqueNats[nat] += 1
    } else {
      uniqueNats[nat] = 1
    }
  }
  return uniqueNats
}

console.log(filterByUniqueNationalities(nationalities))


// Using the filter method to obtain objects that are not completed:
function filterByUncompleted1(array) { 
  // use object destructuring to access the 'completed' key
  return array.filter(({completed}) => !completed) //expression evaluates if the value is false & returns the object
}


// Using a for loop to obtain objects that are not completed:
function filterByUncompleted2(array) {
  let newArray = [] // new array to store the objects 
  let index = 0 // first index of the new array
  for (let i = 0; i < array.length; i++) {
    let object = array[i] // assigning the object at index i to a variable for easier access
    if (!object.completed) { //if the object is not completed
      newArray[index] = object // add the object to the new array
      index++ // increment the index
    }
  }
  return newArray // return the new array with the objects that are not completed
}

console.log(filterByUncompleted2(todosArray))

// Obtain the objects that are completed using the 'reduce' method:
function filterByCompleted(array) {
  return array.reduce((accum, curr) => curr.completed ? [...accum, curr] : accum
  , [])
}

console.log(filterByCompleted(todosArray))

// Using the 'filter' method to obtain uncompleted objects with a priority greater than or equal to 3:
function filterByUncompletedAndPriority(array) {
  return array.filter(({completed, priority}) => !completed && priority >= 3)
}

console.log(filterByUncompletedAndPriority(todosArray))


let charArray = ["I", "s", "r", "a"];

function concatenateCharacters(array) {
  return array.reduce((accum, current)=> accum + current ,"")
}

console.log(concatenateCharacters(charArray))



let data = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/37",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/37",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/2",
    created: "2017-11-04T18:50:21.651Z",
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/3",
    created: "2017-11-04T19:09:56.428Z",
  },
  {
    id: 4,
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/4",
    created: "2017-11-04T19:22:43.665Z",
  },
  {
    id: 5,
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/5",
    created: "2017-11-04T19:26:56.301Z",
  },
  {
    id: 6,
    name: "Abadango Cluster Princess",
    status: "Alive",
    species: "Alien",
    type: "",
    gender: "Female",
    origin: {
      name: "Abadango",
      url: "https://rickandmortyapi.com/api/location/2",
    },
    location: {
      name: "Abadango",
      url: "https://rickandmortyapi.com/api/location/2",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/27"],
    url: "https://rickandmortyapi.com/api/character/6",
    created: "2017-11-04T19:50:28.250Z",
  },
  {
    id: 7,
    name: "Abradolf Lincler",
    status: "unknown",
    species: "Human",
    type: "Genetic experiment",
    gender: "Male",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Testicle Monster Dimension",
      url: "https://rickandmortyapi.com/api/location/21",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
    ],
    url: "https://rickandmortyapi.com/api/character/7",
    created: "2017-11-04T19:59:20.523Z",
  },
  {
    id: 8,
    name: "Adjudicator Rick",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/28"],
    url: "https://rickandmortyapi.com/api/character/8",
    created: "2017-11-04T20:03:34.737Z",
  },
  {
    id: 9,
    name: "Agency Director",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/24"],
    url: "https://rickandmortyapi.com/api/character/9",
    created: "2017-11-04T20:06:54.976Z",
  },
  {
    id: 10,
    name: "Alan Rails",
    status: "Dead",
    species: "Human",
    type: "Superhuman (Ghost trains summoner)",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Worldender's lair",
      url: "https://rickandmortyapi.com/api/location/4",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/25"],
    url: "https://rickandmortyapi.com/api/character/10",
    created: "2017-11-04T20:19:09.017Z",
  },
  {
    id: 11,
    name: "Albert Einstein",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/12"],
    url: "https://rickandmortyapi.com/api/character/11",
    created: "2017-11-04T20:20:20.965Z",
  },
  {
    id: 12,
    name: "Alexander",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Anatomy Park",
      url: "https://rickandmortyapi.com/api/location/5",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/3"],
    url: "https://rickandmortyapi.com/api/character/12",
    created: "2017-11-04T20:32:33.144Z",
  },
  {
    id: 13,
    name: "Alien Googah",
    status: "unknown",
    species: "Alien",
    type: "",
    gender: "unknown",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/31"],
    url: "https://rickandmortyapi.com/api/character/13",
    created: "2017-11-04T20:33:30.779Z",
  },
  {
    id: 14,
    name: "Alien Morty",
    status: "unknown",
    species: "Alien",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/10"],
    url: "https://rickandmortyapi.com/api/character/14",
    created: "2017-11-04T20:51:31.373Z",
  },
  {
    id: 15,
    name: "Alien Rick",
    status: "unknown",
    species: "Alien",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/10"],
    url: "https://rickandmortyapi.com/api/character/15",
    created: "2017-11-04T20:56:13.215Z",
  },
  {
    id: 16,
    name: "Amish Cyborg",
    status: "Dead",
    species: "Alien",
    type: "Parasite",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/15"],
    url: "https://rickandmortyapi.com/api/character/16",
    created: "2017-11-04T21:12:45.235Z",
  },
  {
    id: 17,
    name: "Annie",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Anatomy Park",
      url: "https://rickandmortyapi.com/api/location/5",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/3"],
    url: "https://rickandmortyapi.com/api/character/17",
    created: "2017-11-04T22:21:24.481Z",
  },
  {
    id: 18,
    name: "Antenna Morty",
    status: "Alive",
    species: "Human",
    type: "Human with antennae",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/28",
    ],
    url: "https://rickandmortyapi.com/api/character/18",
    created: "2017-11-04T22:25:29.008Z",
  },
  {
    id: 19,
    name: "Antenna Rick",
    status: "unknown",
    species: "Human",
    type: "Human with antennae",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "unknown",
      url: "",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/10"],
    url: "https://rickandmortyapi.com/api/character/19",
    created: "2017-11-04T22:28:13.756Z",
  },
  {
    id: 20,
    name: "Ants in my Eyes Johnson",
    status: "unknown",
    species: "Human",
    type: "Human with ants in his eyes",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Interdimensional Cable",
      url: "https://rickandmortyapi.com/api/location/6",
    }, 
    image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/8"],
    url: "https://rickandmortyapi.com/api/character/20",
    created: "2017-11-04T22:34:53.659Z",
  },
];

// 1. OBTAIN A LIST WITH ALL THE DIFFERENT TYPES OF SPECIES USING 'MAP' METHOD:


function getSpecies(array) {
  let speciesList = []
  let index = 0
  for (let i = 0; i < array.length; i++) {
    let creature = array[i] 
    speciesList[index] = creature.species
    index ++
  }
  return speciesList
}

const listOfSpecies = data.map((data) => data.species)


console.log(getSpecies(data))


// 2. GET A LIST OF ALL HUMAN CHARACTERS USING 'FILTER' METHOD:
const filterHumans = data.filter((creature) => creature.species === "Human")

// EXTRA: 
const filterAndMapHumans = filterHumans.map((creature) => {
  return {
    name: creature.name,
    status: creature.status,
    species: creature.species,
    gender: creature.gender
  }
})

console.log(filterAndMapHumans)

//  3. USING THE 'FIND' METHOD TO OBTAIN A CHARACTER BY ITS ID: 

function findById(array, id) {
  let character = array.find((creature) => creature.id === id) 
  return character ? character : "Character not found"
}

console.log(findById(data, 17))


// 4. CHECK IF A NAME CONTAINS A SPECIFIED SUBSTRING: 
function findSubstringInName(array, substring) {
  let character = array.find((creature) => creature.name.includes(substring))
  return character ? `${substring} found in ${character.name}` : `${substring} not found in ${character.name}`
}

console.log(findSubstringInName(data, "Sanchez"))


// 5. IDENTIFY THE NUMBER OF CHARACTERS THAT ARE MALE: 

function countMaleCreatures(data) {
  return data.filter((creature) => creature.gender === "Male").length
}

console.log(countMaleCreatures(data))

// 6. NEED A LIST OF ALL CHARACTERS LISTING ONLY THE FOLLOWING KEYS: NAME, TYPE AND SPECIES:


// THE BELOW SOLUTION IS SHORTER:
function getCharacterInfo1(array) {
  return array.map(({id, name, status, species}) => ({id, name, status, species}))
}

// THE BELOW SOLUTION IS LONGER: 
function getCharacterInfo2(array) {
  return array.map((creature) => {
    return {
      name: creature.name,
      status: creature.status,
      species: creature.species
    }
  })
}

console.log(getCharacterInfo2(data))