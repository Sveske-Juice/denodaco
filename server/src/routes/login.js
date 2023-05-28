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
    
    database.getUser(username, true)
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
            const accessToken = createAccessToken(getPayload(user));
            res.cookie('accessToken', accessToken, { sameSite: 'strict', httpOnly: 'true', secure: 'true', maxAge: process.env.JWT_EXPIRATION * 1000});
            res.json({
                "username": user["username"],
                "user_id": user["id"],
                "token": accessToken});
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
}

function getPayload(user)
{   
    return {
        "username": user["username"],
        "has_profile_picture": user["has_profile_picture"],
        "user_id": user["id"],
        "is_admin": user["is_admin"],
    }
}

function createAccessToken(payload)
{
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = login;