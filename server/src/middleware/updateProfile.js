const logger = require("../logger");
const database = require("../database");

function updateProfile(req, res)
{
    const modifiedUser = req.body;

    if (modifiedUser == undefined)
    {
        res.statusMessage = "No data supplied";
        res.sendStatus(400);
        return;
    }

    logger.log(`Updating profile '${res.locals.userInfo["username"]}'`);
    database.alterUser(res.locals.userInfo["username"], modifiedUser)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => 
    {
        logger.log(`[ERR]: ${err}`);
        res.statusMessage = `${err}`;
        res.sendStatus(500);
    });
}

module.exports = updateProfile;