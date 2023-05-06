const logger = require("../logger");
const config = require("../config");
const fs = require("fs");

function avatar(req, res)
{
    if (!res.locals.userInfo["has_profile_picture"])
    {
        return res.redirect(config.serverRoot() + "/uploads/default_avatar.jpg");
    }

    const userID = res.locals.userInfo["user_id"];
    let avatar = fs.readdirSync(config.uploadsPath() + `/${userID}`)
    .filter((filename) => {
        let splitted = filename.split('.');
        if (splitted == undefined || splitted.length == 0)
            return false;
        if (splitted[0] == "avatar")
            return splitted[0];
    });
    logger.log(`Returning avatar at: ${avatar[0]}`);
    
    if (avatar == undefined || avatar.length == 0)
    {
        logger.log(`[WARN] Could not find avatar, when user is set to have a custom avatar! using defualt instead, but this is a bug!`);
        return;
    }
    
    const fileName = avatar[0];

    res.redirect(config.serverRoot() + `/uploads/${userID}/${fileName}`);
}

module.exports = avatar;