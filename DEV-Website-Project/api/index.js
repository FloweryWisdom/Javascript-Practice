// --- THE BUS STATION (api/index.js) ---
// This file is the "Manager" of your Vercel functions.
// It ensures the Bus (Database) is running before letting users into the station (Express).

const mongoose = require('mongoose');
const app = require('../src/server'); // We bring in (import) the Express Station we built in src/server.js

// Check if we have "Address" for our Bus Terminal (MONDODB URI) 
if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// -------------------------------------------------------------------------
// THE GLOBAL CACHE: "The Station Lobby"
// -------------------------------------------------------------------------
/* In a serverless world, Vercel might "reset" the station often.
   We store the connection globally so if the station is just "renovated"
   but not "destroyed," we can reuse the same bus. */
// EXTRA NOTES: Because Vercel functions are "stateless" (they restart frequently), we need a way
// to keep the database connection alive across multiple requests. We attach a "cached" object to
// global NodeJS scope.
// - If the function stays warm (alive), 'global.mongoose' will still exist.
// - If the function cold starts (restarts), 'global.mongoose' will be null. If no one visits the site for 15 minutes,
// Vercel will cold start (full restart).
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// -------------------------------------------------------------------------
// THE SERVERLESS FUNCTION HANDLER
// -------------------------------------------------------------------------
// This is the function Vercel executes every time a user makes a request. 
// It receives the standard Request (req) and Response (res) objects.
module.exports = async (req, res) => {

    // 1. THE BUS CHECK

    // If the Bus is already parked at the station (cached.conn), use it immediately!
    if (cached.conn) {
        //return cached.conn; // Skip the waiting and let the user into the Express Station
    }

    // 2. THE TICKET CHECK (The Promise)
    // If the bus isn't here, we check if someone has already called for one. 
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Don't let users wait indefinitely if the bus breaks down
            family: 4 // Use IPv4 to avoid some connection issues (optional)
        };

        // We "Call the Bus" and save the Ticket (promise).
        // Even if the bus takes 500ms to arrive, we now have the Ticket recorded.
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            console.log("The Bus has arrived at the terminal!");
            return mongoose; 
        });
    }

    // 3. THE WAITING ROOM
    try {
        // Everyone (Request A, B, and C) sits in the waiting room
        // watching the same Ticket (promise) until the Bus (connection) arrives
        cached.conn = await cached.promise;
    } catch (error) {
        // If the bus chrashes on the way, throw away the ticket so we can try calling a new one later.
        cached.promise = null;
        throw error;
    }

    // 4. THE STATION IS OPEN
    // Now that the Bus is parked and ready, pass the user's request to your Express App.
    return app(req, res); 
};