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

// Expose the connection
module.exports = pool;
