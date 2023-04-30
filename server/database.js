const mysql = require("mysql");
const logger = require("./logger");

const initialized = false;
let connection;

function init()
{
    logger.log(`[DB] Connecting to database with db username: '${process.env.DB_USER}`);
    connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        port: process.env.DB_SOCK,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    
    connection.connect((err) =>
    {
        if (err) throw err;
        logger.log("[DB] Connected to database!");
    });
}

module.exports = 
{
    init,
}