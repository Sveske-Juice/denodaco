const database = require("../database");

function dataCollection(req, res)
{
    const userData = req.body;
    if (userData == undefined)
    {
        res.statusMessage = "No userdata provided";
        res.sendStatus(400);
        return;
    }

    userData["ip"] = req.ip;
    userData["user_agent"] = req.useragent;

    const userId = res.locals.userInfo["user_id"];
    database.updateUserdata(userId, JSON.stringify(userData))
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.statusMessage == `DB error ${err}`;
        res.sendStatus(500);
        throw err;
    });
}

module.exports = dataCollection;