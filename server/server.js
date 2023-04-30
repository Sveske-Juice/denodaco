require("dotenv").config({path: __dirname + "/.env"}); // Load .env variables

const config = require("./config");

const express     = require("express");
const logger      = require("./logger.js");

// middleware
const verifyJWT   = require("./middleware/jwt_verify");
const login       = require("./middleware/login"); 

const app = express();
const port = 3500;

logger.init();

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});

app.use((req, res, next) => {logger.logRequest(req); next(); });

app.use(express.json());
app.use(verifyJWT);

app.get(config.serverRoot() + "/s", (req, res, next) => 
{
    res.send("lol");
});

app.post(config.serverRoot() + "/api/login", login);