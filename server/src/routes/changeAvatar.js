const jwt = require("jsonwebtoken");
const fs = require("fs");

const logger = require("../logger");
const config = require("../config");
const database = require("../database");

function changeAvatar(req, res)
{
    if (!req.files || Object.keys(req.files).length === 0)
    {
        res.statusMessage = "No files were uploaded.";
        res.sendStatus(400);
        return;
    }

    let avatar = req.files.avatar;

    if (avatar == undefined)
    {
        res.statusMessage = "Uploaded file must be named 'avatar'";
        res.sendStatus(400);
        return;
    }
    const userID = res.locals.userInfo["user_id"];
    const extension = avatar.name.split('.')[1];

    if (extension == undefined)
    {
        res.statusMessage = "Avatar needs to have an extension";
        res.sendStatus(400);
        return;
    }

    const image = avatar.mimetype.split('/')[0] == "image" ? true : false;
    if (!image)
    {
        res.statusMessage = `Avatar needs to be an image, but a ${avatar.mimetype} file was given`;
        res.sendStatus(400)
        return;
    }

    const avatarPath = config.uploadsPath() + `/${userID}/avatar.${extension}`;

    // Remove old avatar
    // Gets all file in user's upload with 'avatar' in name
    const avatarImgs = fs.readdirSync(config.uploadsPath() + `/${userID}`)
    .filter((fileName) => {
        let splitted = fileName.split('.');
        if (splitted == undefined || splitted.length == 0)
            return false;
        if (splitted[0] == "avatar")
            return splitted[0];
    });

    // remove all the avatar images
    avatarImgs.forEach((file) => {
        fs.rmSync(config.uploadsPath() + `/${userID}/${file}`);
    })

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