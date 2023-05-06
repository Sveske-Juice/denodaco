const jwt = require("jsonwebtoken");

const logger = require("../logger");
const config = require("../config");
const database = require("../database");

function changeAvatar(req, res)
{
    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).send('No files were uploaded.');
    }

    let avatar = req.files.avatar;

    if (avatar == undefined)
    {
        return res.status(400).send("Uploaded file must be named 'avatar'");
    }
    const userID = res.locals.userInfo["user_id"];
    const extension = avatar.name.split('.')[1];
    const avatarPath = config.uploadsPath() + `/${userID}/avatar.${extension}`;
    avatar.mv(avatarPath, (err) => {
        if (err)
        {
            res.status(500).send(err);
            logger.log(`[ERR]: ${err}`);
            throw err;
        }

        // Set has_profile_picture to true in db, so its not default avatar being shown
        database.SetUserHasPP(userID, true)
        .then((result) => {
            const updatedToken = res.locals.userInfo;
            updatedToken["has_profile_picture"] = 1;
            const accessToken = jwt.sign(updatedToken, process.env.JWT_SECRET);
            // TODO dont make expiration reset here
            res.cookie('accessToken', accessToken, { sameSite: 'strict', httpOnly: 'true', secure: 'true', maxAge: process.env.JWT_EXPIRATION * 1000});
            res.status(200).send("Avatar successfully updated");
        })
        .catch((err) => {
            res.status(500).send("Error occured when trying to update db with has_profile_picture");
            logger.log(`[ERR]: ${err}`);
            throw err;
        });

    })
}

module.exports = changeAvatar;