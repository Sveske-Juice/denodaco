const logger = require("../logger");
const config = require("../config");
const fs = require("fs");

function avatar(req, res)
{
    if (!res.locals.userInfo["has_profile_picture"])
    {
        return res.redirect(config.serverRoot() + "/uploads/default_avatar.jpg");
    }

    let avatar = fs.readdirSync(config.uploadsPath() + `/${res.locals.userInfo["username"]}`)
    .filter((filename) => {
        let splitted = filename.split('.');
        if (splitted == undefined || splitted.length == 0)
            return false;
        if (splitted[0] == "avatar")
            return true;
    });
    logger.log(`Returning avatar at: ${avatar}`);
    // res.redirect(config.serverRoot() + `/uploads/${res.locals.userInfo["username"]}/avatar`);
}

module.exports = avatar;