const mysql = require("mysql");
const logger = require("./logger");
const moment = require("moment");

let connection;

function init()
{
    logger.log(`[DB] Connecting to database with db username: '${process.env.DB_USER}'`);
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

    connection.query("SELECT * FROM users;", (err) => {
        if (err) throw err;}
    );
}

function cleanup()
{
    return new Promise((resolve) =>
    {
        // Gracefully close db connection
        connection.end((err) =>
        {
            if (err) throw err;
            logger.logSync(`[DB] Connection gracefully closed`);
            resolve();
        });
    })
}

// HELPER METHODS FOR DB HANDLING

function getUser(username)
{
    return new Promise((resolve, reject) => {
        if (username == undefined || username.length == 0)
        {
            return reject(new Error("No username specified"));
        }
        
        const safeUsername = mysql.escape(username);
    
        // TODO only get necsesary data 
    
        connection.query(
        `SELECT * FROM users
        WHERE username = ${safeUsername};`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });

    });
}

async function addUser(userData)
{
    let newUser = userData;

    // TODO refactor this lmao
    // Verify required entries exists
    if (newUser["username"] == undefined || newUser["username"].length == 0)
        throw new Error("No username provided");

    if (newUser["first_name"] == undefined || newUser["first_name"].length == 0)
        throw new Error("First name not provided");

    if (newUser["middle_names"] == undefined || newUser["middle_names"].length == 0)
        throw new Error("Middle names not provided");

    if (newUser["last_name"] == undefined || newUser["last_name"].length == 0)
        throw new Error("Last not provided");
    
    if (newUser["country_code"] == undefined || newUser["country_code"].length == 0)
        throw new Error("Country code not provided");

    if (newUser["email"] == undefined || newUser["email"].length == 0)
        throw new Error("Email not provided");

    // Verify db constraints
    if (newUser["username"].length > 255)
        throw new Error("Username to long");

    if (newUser["first_name"].length > 255)
        throw new Error("First name to long");

    if (newUser["middle_names"].length > 255)
        throw new Error("Middle names to long");

    if (newUser["last_name"].length > 255)
        throw new Error("Last name to long");
    if (newUser["country_code"].length > 2)
        throw new Error("Country code to long");

    if (newUser["email"].length > 255)
        throw new Error("Email to long");

    // Sanitize user inputted data
    newUser["password"] = mysql.escape(newUser["password"]);
    newUser["username"] = mysql.escape(newUser["username"]);
    newUser["first_name"] = mysql.escape(newUser["first_name"]);
    newUser["middle_names"] = mysql.escape(newUser["middle_names"]);
    newUser["last_name"] = mysql.escape(newUser["last_name"]);
    newUser["country_code"] = mysql.escape(newUser["country_code"]);
    newUser["birthday"] = mysql.escape(newUser["birthday"]);
    newUser["email"] = mysql.escape(newUser["email"]);

    // Server side options
    const now = new Date();
    newUser["is_admin"] = false;
    newUser["has_profile_picture"] = false;
    newUser["account_creation"] = moment(now).format('YYYY-MM-DD HH:mm:ss').toString();
    newUser["last_login"] = moment(now).format('YYYY-MM-DD HH:mm:ss').toString();
    newUser["birthdate"] = moment(newUser["birthdate"]).format('YYYY-MM-DD HH:mm:ss').toString();
    if (newUser["birthdate"] == "Invalid date")
        throw new Error("Invalid birthday");

    connection.query(
        `INSERT INTO users(
            username,
            first_name,
            middle_names,
            last_name,
            country_code,
            birthdate,
            account_creation,
            last_login,
            email,
            is_admin,
            has_profile_picture,
            hash,
            salt)
        VALUES (
            ${newUser["username"]},
            ${newUser["first_name"]},
            ${newUser["middle_names"]},
            ${newUser["last_name"]},
            ${newUser["country_code"]},
            '${newUser["birthdate"]}',
            '${newUser["account_creation"]}',
            '${newUser["last_login"]}',
            ${newUser["email"]},
            ${newUser["is_admin"]},
            ${newUser["has_profile_picture"]},
            '${newUser["hash"]}',
            '${newUser["salt"]}');`
            , (err) => {
                if (err) throw err;
                return;
            });
}

module.exports = 
{
    init,
    cleanup,
    getUser,
    addUser,
}