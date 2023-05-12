const config = require("../config");

function logout(req, res)
{
    // Delete cookie
    res.cookie("accessToken", "", {maxAge: 1, sameSite: "strict", httpOnly: "true", secure: "true"});
    res.sendStatus(200);
}

module.exports = logout;