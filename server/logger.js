const fs = require("fs");
const logFile = __dirname + "/logs/latest.log";

function init()
{
    // TODO move old log files for long term storage

    // First time run or server cleared log files
    if (!fs.existsSync(logFile))
        return;

    // Remove old log
    fs.unlinkSync(logFile, (err) => {
        if (err) throw err;

    });
}

function logRequest(request)
{
    const loggedReq = `Request to ${request.url} from ${request.headers['x-forwarded-for']}\n`;
    log(loggedReq);
    fs.appendFile(logFile, loggedReq, (err) => {
        if (err) throw err;
    });
}

function log(msg)
{
    const output = `[${new Date()}] ${msg}`;
    console.log(output);
}

module.exports = {
    logRequest,
    log,
    init,
}