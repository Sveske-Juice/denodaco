const logger = require("../logger");
const database = require("../database");

function getAllUsers(req, res)
{
    const userID = res.locals.userInfo["user_id"];
    logger.log(`${res.locals.userInfo["username"]} (id: ${userID}) requested all to dump all users.`);
    database.getAllUsersExcept(userID)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        throw err;
    });
}

module.exports = getAllUsers;