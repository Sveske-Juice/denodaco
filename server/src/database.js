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

async function addUser(userData)
{
    let newUser = userData;

    // Sanitize user inputted data
    newUser["password"] = mysql.escape(newUser["password"]);
    newUser["username"] = mysql.escape(newUser["username"]);
    newUser["first_name"] = mysql.escape(newUser["first_name"]);
    newUser["middle_names"] = mysql.escape(newUser["middle_names"]);
    newUser["last_name"] = mysql.escape(newUser["last_name"]);
    newUser["country_code"] = mysql.escape(newUser["country_code"]);
    newUser["birthday"] = mysql.escape(newUser["birthday"]);
    newUser["email"] = mysql.escape(newUser["email"]);

    if (newUser["username"].length > 255)
        return "ERROR: Username to long";

    if (newUser["first_name"].length > 255)
        return "ERROR: First name to long";

    if (newUser["middle_names"].length > 255)
        return "ERROR: Middle names to long";

    if (newUser["last_name"].length > 255)
        return "ERROR: Last name to long";

    if (newUser["country_code"].length > 2)
        return "ERROR: Country code to long";

    if (newUser["email"].length > 255)
        return "ERROR: Email to long";

    connection.query(
        `INSERT INTO users( username,
                            first_name,
                            middle_names,
                            last_name,
                            country_code,
                            birthdate,
                            account_creation,
                            last_login,
                            biography,
                            email,
                            is_admin,
                            has_profile_picture,
                            hash,
                            salt)
        VALUES(
            ${newUser["username"]},
            ${newUser["first_name"]},
            ${newUser["middle_names"]},
            ${newUser["last_name"]},
            ${newUser["country_code"]},
            ${newUser["birthdate"]},
            ${newUser["account_creation"]},
            ${newUser["last_login"]},
            ${newUser["biography"]},
            ${newUser["email"]},
            ${newUser["is_admin"]},
            ${newUser["has_profile_picture"]},
            ${newUser["email"]},
            ${newUser["hash"]},
            ${newUser["salt"]},
        )`
    , (err, result) => {
        if (err) throw err;
        return result;
    });
}

module.exports = 
{
    init,
    cleanup,
    addUser,
}