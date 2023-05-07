require("dotenv").config({path: __dirname + "/.env"}); // Load .env variables
const fileUpload    = require("express-fileupload");

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
const updateProfile = require("./middleware/updateProfile");
const avatar        = require("./middleware/avatar");
const changeAvatar  = require("./middleware/changeAvatar");
const getAllUsers    = require("./middleware/getAllUsers");

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
app.use(fileUpload({limits: {fieldSize: process.env.MAX_UPLOAD_SIZE*1024*1024}, }));

app.get(config.serverRoot() + "/api/pollauth", (req, res) => { res.sendStatus(200); });

app.get(config.serverRoot() + "/api/logout", logout);

app.post(config.serverRoot() + "/api/login", login);
app.post(config.serverRoot() + "/api/signup", signup);

app.post(config.serverRoot() + "/api/update_profile", updateProfile);
app.get(config.serverRoot() + "/api/get_profile_data", getProfileData);

app.get(config.serverRoot() + "/api/avatar", avatar);
app.post(config.serverRoot() + "/api/change_avatar", changeAvatar);
app.get(config.serverRoot() + "/api/get_all_users", getAllUsers);

// Error handling
app.use((err, req, res, next) => {
  logger.log(`[ERR]: ${err}`);
  if (err instanceof SyntaxError)
    return res.status(400).send("Invalid data");
  res.status(500).send(`Server error: ${err}`);
  throw err;
});


process.on('SIGINT', () =>
{
  database.cleanup().finally(() => process.exit());
});