const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next)
{
    next();
}

function denyToken(req, res)
{

}

module.exports = verifyToken;