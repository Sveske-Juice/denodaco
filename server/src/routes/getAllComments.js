const logger = require("../logger");
const database = require("../database");

function getAllComments(req, res)
{
    const postid = req.query.post_id;
    database.getAllComments(postid)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.statusMessage = err;
        res.sendStatus(400);
    });
}

module.exports = getAllComments;