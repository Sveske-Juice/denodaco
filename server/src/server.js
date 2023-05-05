require("dotenv").config({path: __dirname + "/.env"}); // Load .env variables

const config      = require("./config");
const database    = require("./database");

const express     = require("express");
const cookieparser= require("cookie-parser");
const logger      = require("./logger.js");

// middleware
const verifyJWT     = require("./middleware/jwt_verify");
const login         = require("./middleware/login");
const logout        = require("./middleware/logout"); 
const signup        = require("./middleware/signup");
const getProfileData= require("./middleware/getProfileData");

const app = express();
const port = 3500;

logger.init();
database.init();

app.listen(port, function () {
  logger.log(`Listening on port ${port}!`);
});

app.use((req, res, next) => {logger.logRequest(req); next(); });

app.use(express.json());
app.use(cookieparser());
app.use(verifyJWT);

app.get(config.serverRoot() + "/api/pollauth", (req, res) => { res.sendStatus(200); });

app.get(config.serverRoot() + "/api/logout", logout);

app.post(config.serverRoot() + "/api/login", login);
app.post(config.serverRoot() + "/api/signup", signup);

app.get(config.serverRoot() + "/api/get_profile_data", getProfileData);


process.on('SIGINT', () =>
{
  database.cleanup().finally(() => process.exit());
});