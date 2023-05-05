const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const database = require("../database");
const logger = require("../logger");

async function login(req, res)
{
    const username = req.body.username;

    if (username == undefined || username == "")
    {
        res.statusMessage = "No username supplied";
        res.sendStatus(400);
        return;
    }

    const password = req.body.password;

    if (password == undefined || password == "")
    {
        res.statusMessage = "No password supplied";
        res.sendStatus(400);
        return;
    }
    
    const dbResult = database.getUser(username)
    .then(async function (result)
    {
        // Verify username exists
        if (result.length == 0)
        {
            res.statusMessage = "Username not registered"; //!hacker could use this to check if users are registered or not
            res.sendStatus(401);
            return;
        }

        const user = result[0];

        // Verify passwords match
        const saltedPass = password + user["salt"];
        try {
            if (!await argon2.verify(user["hash"], saltedPass))
            {
                logger.log(`Client typed wrong password for user '${user["username"]}'`);
                res.statusMessage = "Wrong password";
                res.sendStatus(401);
                return; 
            }

            // Passwords match
            logger.log(`[AUTH] User '${username} just logged in.`);
            const accessToken = createAccessToken(user);
            res.json({ "accessToken": accessToken});
            return;
        }
        catch (err)
        {
            throw err;
        }
    })
    .catch((err) => {
        throw err;
    });

    // const jwtData = {
    //     "username": username,
    // }

    // const accessToken = jwt.sign(jwtData, process.env.JWT_SECRET);
    // res.json({ "accessToken": accessToken});
}

function createAccessToken(user)
{
    const payload = {
        "username": user["username"]
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = login;