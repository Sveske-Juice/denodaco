const jwt = require("jsonwebtoken");

function login(req, res)
{
    const username = req.body.username;

    if (username == undefined || username == "")
    {
        res.statusMessage = "No username supplied";
        res.sendStatus(400);
        return;
    }

    const password = req.body.password;

    if (password == undefined || password == "")
    {
        res.statusMessage = "No password supplied";
        res.sendStatus(400);
        return;
    }
    
    const jwtData = {
        "username": username,
    }

    const accessToken = jwt.sign(jwtData, process.env.JWT_SECRET);
    res.json({ "accessToken": accessToken});
}

module.exports = login;