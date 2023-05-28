const database = require("../database");
const logger = require("../logger");

function uploadPost(req, res)
{
    logger.log(JSON.stringify(req.body));
    logger.log(JSON.stringify(res.locals.userInfo));
    database.createPost(res.locals.userInfo["user_id"], req.body.title, req.body.content)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        logger.log(err);
        res.statusMessage = err;
        res.sendStatus(400);
    });
}

module.exports = uploadPost;