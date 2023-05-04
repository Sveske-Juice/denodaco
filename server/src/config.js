// The root where the server will be hosted on, like https://domain/something, where 'something' is the root
// used for when this is served under a reverse proxy
const serverRoot = "/denodaco";

exports.serverRoot = () => serverRoot;