// The root where the server will be hosted on, like https://domain/something, where 'something' is the root
// used for when this is served under a reverse proxy
const _serverRoot = "/denodaco";

const _uploadsPath = "/var/www/denodaco/public/uploads";

function serverRoot() { return _serverRoot; }
function uploadsPath() { return _uploadsPath; }

module.exports = {
    serverRoot,
    uploadsPath,
}