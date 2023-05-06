const crypto = require("crypto");
const argon2 = require("argon2")
const fs = require("fs");
const database = require("../database")
const logger = require("../logger");
const config = require("../config");

async function signup(req, res)
{
    const userData = req.body;

    if (userData == undefined || userData == "")
    {
        res.statusMessage = "No user data specified";
        res.sendStatus(400);
        return;
    }

    if (userData["password"] == undefined || userData["password"].length == 0)
    {
        res.statusMessage = "No password supplied";
        res.sendStatus(400);
        return;
    }

    // Hash and salt password
    const salt = crypto.randomBytes(16).toString('hex');
    const saltedPass = userData["password"] + salt;

    userData["salt"] = salt;
    const username = userData["username"];
    argon2.hash(saltedPass).then((hash) => {
        userData["hash"] = hash;

        database.addUser(userData).then((result) => {
            logger.log(`New user: ${username} registered!`);
 
            // Set up new user
            setupUser(username, req, res);
        }).catch((err) => {
            if (err instanceof Error)
            {
                res.statusMessage = err;
                res.sendStatus(400);
                return;
            }

            // Other unhandled errors might be db errors etc.
            res.statusMessage = `SERVER ERROR: ${err}`;
            res.sendStatus(500);
            throw err;
        });
    }).catch((err) => {
        throw err;
    });
}

function setupUser(username, req, res)
{
    logger.log(`Setting up new user ${username}`);
    database.getUser(username)
    .then((result) => {
        result = result[0];
        // Create default avatar
        const avatarPath = config.uploadsPath() + `/${result["id"]}`;
        if (!fs.existsSync(avatarPath))
        {
            fs.mkdir(avatarPath, {recursive: true}, (err) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        }
    })
    .catch((err) => {
        throw err;
    });
}

module.exports = signup;