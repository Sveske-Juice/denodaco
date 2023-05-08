const logger = require("../logger");
const config = require("../config");
const fs = require("fs");

function avatar(req, res)
{
    const customUserID = req.query["userID"] == undefined ? res.locals.userInfo["user_id"] : req.query["userID"];
    const redirect = req.query["redirect"] == undefined ? true : req.query["redirect"]; // Should send 302 or 200 with link to src
    logger.log(JSON.stringify(req.query));
    logger.log(redirect);
    
    // Return another user's avatar than the requester
    let avatar;
    try {
        avatar = fs.readdirSync(config.uploadsPath() + `/${customUserID}`)
        .filter((filename) => {
            let splitted = filename.split('.');
            if (splitted == undefined || splitted.length == 0)
                return false;
            if (splitted[0] == "avatar")
                return splitted[0];
        });
    }
    catch(err)
    {
        if (String(err).includes("ENOENT"))
        {
            res.statusMessage = "Probably invalid userid";
            res.sendStatus(400);
            return;
        }
        throw err;
    }

    if (avatar == undefined || avatar.length == 0)
    {
        if (req.query["userID"] == undefined)
            logger.log(`[WARN] Could not find avatar, when user is set to have a custom avatar! using defualt instead, but this is a bug!`);

        const path = config.serverRoot() + "/uploads/default_avatar.jpg";
        if (redirect == true)
            res.redirect(path);
        else
            res.json({"src": path});
        return;
    }
    
    const fileName = avatar[0];
    const path = config.serverRoot() + `/uploads/${customUserID}/${fileName}`;
    if (redirect == true)
        res.redirect(path);
    else
        res.json({"src": path});
}

module.exports = avatar;