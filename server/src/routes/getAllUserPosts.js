const logger = require("../logger");
const database = require("../database");

function getAllUserPosts(req, res)
{
    database.getAllUserPosts()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        logger.log(err);
        res.statusMessage = err;
        res.sendStatus(500);
    });
}

module.exports = getAllUserPosts;