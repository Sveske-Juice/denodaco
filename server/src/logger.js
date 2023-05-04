const fs = require("fs");
const path = require("path");
const logFile = path.normalize(__dirname + "/../logs/latest.log");

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
}

function formatLog(msg)
{
    const output = `[${new Date()}] ${msg}`;
    return output;
}

function log(msg)
{
    output = formatLog(msg);
    console.log(output);
    fs.appendFile(logFile, output + '\n', (err) => {
        if (err) throw err;
    });
}

function logSync(msg)
{
    output = formatLog(msg);
    console.log(output);
    try
    {
        fs.appendFileSync(logFile, output + '\n');
    }
    catch(err)
    {
        throw err;
    }
}

module.exports = {
    logRequest,
    log,
    logSync,
    init,
}