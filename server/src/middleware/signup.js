const crypto = require("crypto");
const argon2 = require("argon2")
const database = require("../database")
const logger = require("../logger");

async function signup(req, res)
{
    const userData = req.body;
    logger.log(`User trying to sign in, with data: ${JSON.stringify(userData)}`);
    if (userData == undefined || userData == "")
    {
        res.statusMessage = "No user data specified";
        res.sendStatus(400);
        return;
    }

    // Hash and salt password
    const salt = crypto.randomBytes(16).toString('hex');
    const saltedPass = userData["password"] + salt;
    logger.log(userData["email"]);
    userData["salt"] = salt;
    argon2.hash(saltedPass).then((hash) => {
        userData["hash"] = hash;

        database.addUser(userData).then((result) => {
            res.sendStatus(200);
            logger.log(`RESULT: ${result}`);
            return;
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

module.exports = signup;