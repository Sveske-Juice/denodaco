const logger = require("../logger");
const database = require("../database");

function getProfileData(req, res)
{
    const username = res.locals.userInfo["username"];
    logger.log(`Getting userinformation for '${username}'...`);
    database.getUser(username)
    .then((result) => {
        result = result[0];

        // redact sensetive info
        delete result.hash;
        delete result.salt;

        res.json(result);
    })
    .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
        throw err;
    })
}

module.exports = getProfileData;