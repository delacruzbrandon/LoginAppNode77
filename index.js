// Dependencies
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
require('dotenv/config');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Global Variables
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL;
const databaseUrl = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;

// Routers
const loginRouter = require('./routes/login_route');
const reigsterRouter = require('./routes/register_route');

// Mounting routers
app.use(`${apiUrl}/login`, loginRouter);
app.use(`${apiUrl}/register`, reigsterRouter);

// Database Connection
mongoose.connect(databaseUrl, {
    dbName: databaseName
})
.then(() => console.log('MongoDB is connected! Congrats :)'))
.catch(err => console.log('MongoDB connection error :(', err));

app.listen(
    port, () => {
        console.log(`Login77 Backend Started on ${port}`);
});


app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Login77 Backend! :P</h1>');
});