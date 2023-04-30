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
    const authHeader = req.headers["authorization"];

    if (authHeader == undefined)
    {
        denyToken("No token specified", res);
        return;
    }

    const splittedHeader = authHeader.split("Bearer ");

    if (splittedHeader == undefined || splittedHeader.length < 1)
    {
        denyToken("No token specified", res);
        return;
    }

    const token = splittedHeader[1];

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

        next();
    });
}

function requiresAuthentication(req)
{
    if (req.path == config.serverRoot() + "/api/login")
        return false;
    
    return true;
}

function denyToken(reason, res)
{
    res.statusMessage = reason;
    res.sendStatus(401);
}

module.exports = verifyToken;