const express = require("express");
const logger = require("./logger.js");
const app = express();
const port = 3500;

// The root where the server will be hosted on, like https://domain/something, where 'something' is the root
// used for when this is served under a reverse proxy
const serverRoot = "/denodaco";

logger.init();

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.all(serverRoot, (req, res, next) => 
{
    logger.logRequest(req);
    next();
});

app.get(serverRoot, (req, res, next) => 
{
    res.send("lol");
});