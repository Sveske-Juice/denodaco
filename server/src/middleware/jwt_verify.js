const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require("../config");

function verifyToken(req, res, next)
{
    if (!requiresAuthentication(req))
    {
        next();
        return;
    }
    const token = req.cookies["accessToken"];

    if (token == undefined)
    {
        denyToken("No token specified", res);
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => 
    {
        if (err)
        {
            denyToken("Invalid token", res);
            return;
        }
        res.locals.userInfo = userInfo; // Give next middleware access to decoded token
        next();
    });
}

function requiresAuthentication(req)
{
    if (req.path == config.serverRoot() + "/api/login")
        return false;

    if (req.path == config.serverRoot() + "/api/signup")
        return false;

    if (req.path == config.serverRoot() + "/api/logout")
        return false;
 
    const seperated = req.path.split('.');
    if (seperated.length == 2)
        return false; // a file was requested for - allow access

    return true;
}

function denyToken(reason, res)
{
    res.statusMessage = reason;
    res.sendStatus(401);
}

module.exports = verifyToken;