require('dotenv').config();
const { Pool } = require("pg");

/**
 * -------------- DATABASE ----------------
 */

const pool = new Pool({
// add your configuration
    host: process.env.HOST, 
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.POOL_PORT 
});

// const conn = process.env.DB_STRING;

// const connection = mongoose.createConnection(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
// const UserSchema = new mongoose.Schema({
//     username: String,
//     hash: String,
//     salt: String
// });


// const User = connection.model('User', UserSchema);


// Expose the connection
module.exports = pool;
