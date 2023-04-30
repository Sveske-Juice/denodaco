const fs = require("fs");
const logFile = __dirname + "/logs/latest.log";

function init() {
    // TODO move old log files for long term storage
    
    // First time run or server cleared log files
    if (!fs.existsSync(logFile))
        return;

    // Remove old log
    fs.unlinkSync(logFile, (err) => {
        if (err) throw err;

    });
}

function logRequest(request) {
    const loggedReq = `[${new Date()}] Request to ${request.url} from ${request.headers['x-forwarded-for']}\n`;
    console.log(loggedReq);
    fs.appendFile(logFile, loggedReq, (err) => {
        if (err) throw err;
    });

}

module.exports = {
    logRequest,
    init,
}