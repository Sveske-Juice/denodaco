const logger = require("../logger");
const database = require("../database");

function getUserPost(req, res)
{
    const postid = req.query.id;

    database.getUserPost(postid)
    .then(result => {
        res.send(result[0]);
    })
    .catch(err => {
        res.statusMessage = err;
        res.sendStatus(400);
    });
}

module.exports = getUserPost;