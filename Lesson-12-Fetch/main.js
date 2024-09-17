const getKoders = async () => {
    let result = await fetch('https://javascript27g-a4df9-default-rtdb.firebaseio.com/koders/.json');
    console.log(result);
}

getKoders()