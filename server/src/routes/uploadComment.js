const moment = require("moment");
const logger = require("../logger");
const database = require("../database");

function uploadComment(req, res)
{
    const commentData = req.body;
    if (!commentData["post_id"]) {
        res.statusMessage = "No post specified";
        res.sendStatus(400);
        return;
    }

    if (!commentData["content"]) {
        res.statusMessage = "No content specified";
        res.sendStatus(400);
        return;
    }

    commentData["creation"] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString();
    commentData["owner_id"] = res.locals.userInfo["user_id"];

    database.addComment(commentData["post_id"], commentData)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.statusMessage = err;
        res.sendStatus(500);
        throw err;
    });
}

module.exports = uploadComment;