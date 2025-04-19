//server.js
require(`dotenv`).config() //load .env variables
const express = require(`express`);
const app = express()
const mongoose = require(`mongoose`);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log(`MongoDB connected succesfully!`))
    .catch( err => console.error(`MongoDB connection error:`, err));


//Middleware to parse JSON request bodies 
app.use(express.json());

app.get(`/`, (req, res) => {
    res.send(`Backend server is running!`);
});

const PORT = process.env.PORT || 3000; //Use environment variable or default

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


