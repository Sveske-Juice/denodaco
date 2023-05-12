const logger = require("../logger");
const database = require("../database");

function getProfileData(req, res)
{
    const customUserID = req.query["userID"];
    let requestingUser = true;
    if (customUserID != undefined && customUserID != "")
    {
        requestingUser = false;
    }

    // Can either be a custom user id to get profile data from or from the requesting user
    const userID = requestingUser == true ? res.locals.userInfo["user_id"] : customUserID;

    logger.log(`Getting userinformation for id: '${userID}'...`);
    database.getUser(userID)
    .then((result) => {
        result = result[0];

        // redact sensetive info
        delete result.hash;
        delete result.salt;

        // if the requesting user doesn't have admin rights, then redact semi-sensitive info
        if (res.locals.userInfo["is_admin"] != 1)
        {
            delete result.is_admin;
            delete result.last_login;
            delete result.has_profile_picture;
            delete result.user_data;
        }

        res.json(result);
    })
    .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
        throw err;
    })
}

module.exports = getProfileData;