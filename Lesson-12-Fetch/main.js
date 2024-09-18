const getKoders = async () => {
    let response = await fetch('https://javascript27g-a4df9-default-rtdb.firebaseio.com/koders/.json');
    let data = await response.json();
    console.log(response);
    console.log(data);
}

getKoders()

async function createKoders(newKoder) {
    let response = await fetch('https://javascript27g-a4df9-default-rtdb.firebaseio.com/koders/.json', {
        method: 'POST', 
        body: JSON.stringify(newKoder),
    })
    let data = await response.json();
    return data; 
}

async function getKoderById(koderId) {
    let response = await fetch(`https://javascript27g-a4df9-default-rtdb.firebaseio.com/koders/${koderId}.json`, {
        method: 'GET',
    })
    let data = await response.json();
    console.log(data);
    return data;
}

async function createNewCollection(collectionName) {
    let response = await fetch(`https://javascript27g-a4df9-default-rtdb.firebaseio.com/${collectionName}.json`, {
        method: 'PUT',
        body: JSON.stringify({name:'Playstation 5 Pro', price:'$700'}),
    })
    let data = await response.json();
    return data;
}