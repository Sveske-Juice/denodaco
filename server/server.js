const express = require("express");
const app = express();
const port = 3500;

// The root where the server will be hosted on, like https://domain/something, where 'something' is the root
// used for when this is served under a reverse proxy
const serverRoot = "/denodaco";

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


app.get(serverRoot, (req, res) => 
{
    res.send("HEllooL");
});