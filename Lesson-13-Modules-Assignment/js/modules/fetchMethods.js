// Fetch Users from Firebase
async function fetchUsers() {
    let usersArray = [];

    try {
        let response = await fetch("https://javascript27g-a4df9-default-rtdb.firebaseio.com/users/.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("HTTP error! Status : " + response.status);
        }

        let data = await response.json();
        console.log(data);

        for (let key in data) {
            usersArray.push({ id: key, ...data[key] });
        }

    } catch (error) {
        console.log(error);
    }

    return usersArray;
}


// Fetch a user's data from Firebase using their userKey
async function fetchUserByKey(userKey) {
   try {
        let response = await fetch(`https://javascript27g-a4df9-default-rtdb.firebaseio.com/users/${userKey}.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data.");
        }
        let data = await response.json();
        console.log(data); // Log user data for debugging
        return data;
   } catch (error) {
        console.error("Error fetching user data: ", error);
   }
}

export { fetchUsers, fetchUserByKey };