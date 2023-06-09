require("dotenv").config({path: __dirname + "/.env"}); // Load .env variables
const fileUpload    = require("express-fileupload");

const config      = require("./config");
const database    = require("./database");
const logger      = require("./logger.js");

const express     = require("express");
const cookieparser= require("cookie-parser");
const userAgent   = require("express-useragent");

const verifyJWT     = require("./middleware/jwt_verify");
const login         = require("./routes/login");
const logout        = require("./routes/logout"); 
const signup        = require("./routes/signup");
const getProfileData= require("./routes/getProfileData");
const updateProfile = require("./routes/updateProfile");
const avatar        = require("./routes/avatar");
const changeAvatar  = require("./routes/changeAvatar");
const getAllUsers   = require("./routes/getAllUsers");
const dataCollection= require("./routes/dataCollection");
const uploadPost    = require("./routes/uploadPost");
const getAllUserPosts= require("./routes/getAllUserPosts");
const getUserPost   = require("./routes/getUserPost");
const getAllComments= require("./routes/getAllComments");
const uploadComment = require("./routes/uploadComment");

const app = express();
const port = 3500;

logger.init();
database.init();

app.listen(port, function () {
  logger.log(`Listening on port ${port}!`);
});

app.use((req, res, next) => {logger.logRequest(req); next(); });

// Express libraries
app.use(express.json());
app.use(cookieparser());
app.use(userAgent.express());

app.use(verifyJWT);

app.use(fileUpload({limits: {fieldSize: process.env.MAX_UPLOAD_SIZE*1024*1024}, }));

// Express routes
app.get(config.serverRoot() + "/api/pollauth", (req, res) => { res.sendStatus(200); });

app.get(config.serverRoot() + "/api/logout", logout);

app.post(config.serverRoot() + "/api/login", login);
app.post(config.serverRoot() + "/api/signup", signup);

app.post(config.serverRoot() + "/api/update_profile", updateProfile);
app.post(config.serverRoot() + "/api/change_avatar", changeAvatar);
app.post(config.serverRoot() + "/api/data_collection", dataCollection);
app.post(config.serverRoot() + "/api/upload_post", uploadPost);
app.post(config.serverRoot() + "/api/upload_comment", uploadComment);

app.get(config.serverRoot() + "/api/get_profile_data", getProfileData);
app.get(config.serverRoot() + "/api/avatar", avatar);
app.get(config.serverRoot() + "/api/get_all_users", getAllUsers);
app.get(config.serverRoot() + "/api/get_all_user_posts", getAllUserPosts);
app.get(config.serverRoot() + "/api/get_user_post", getUserPost);
app.get(config.serverRoot() + "/api/get_all_comments", getAllComments);

// Error handling // TODO refactor this
app.use((err, req, res, next) => {
  logger.log(`[ERR]: ${err}`);
  if (err instanceof SyntaxError)
    return res.status(400).send("Invalid post data");
  res.status(500).send(`Server error: ${err}`);
  throw err;
});

process.on('SIGINT', () =>
{
  database.cleanup().finally(() => process.exit());
});