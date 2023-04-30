require("dotenv").config({path: __dirname + "/.env"}); // Load .env variables

const express = require("express");
const logger = require("./logger.js");

// middleware
const verifyJWT   = require("./middleware/jwt_verify");
const login       = require("./middleware/login"); 

const app = express();
const port = 3500;

// The root where the server will be hosted on, like https://domain/something, where 'something' is the root
// used for when this is served under a reverse proxy
const serverRoot = "/denodaco";

logger.init();

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

app.use(express.json());
app.use(verifyJWT);

app.all(serverRoot, (req, res, next) => 
{
    logger.logRequest(req);
    next();
});

app.get(serverRoot + "/s", (req, res, next) => 
{
    res.send("lol");
});

app.post(serverRoot + "/api/login", login);