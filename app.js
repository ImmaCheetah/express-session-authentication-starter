// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes');
const connection = require('./config/database');

// Create the Express application
const app = express();
// Package documentation - https://www.npmjs.com/package/connect-mongo
const pgStore = require('connect-pg-simple')(session);

/**
 * -------------- SESSION SETUP ----------------
*/
const sessionStore = new pgStore({pool: connection})

app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

/**
 * -------------- GENERAL SETUP ----------------
*/

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
// app.use(passport.initialize()) no longer needed

// 
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000, () => console.log("app listening on port 3000!"));