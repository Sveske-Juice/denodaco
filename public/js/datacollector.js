/* This file is definetly not for data collection... :D */
import { BASE_URL, API_ENDPOINT, DATA_COLLECTION_INTERVAL } from "./modules/config.js";
import { onAuthed } from "./modules/authmanager.js";

let data = {
    "location": undefined,
    "screen_width": undefined,
    "screen_height": undefined,
    "resolution_width": undefined,
    "resolution_height": undefined,
    "os": undefined,
    "browser": undefined,
    "locale": undefined,
    "platform": undefined,
};

function init()
{
    // Watch location
    navigator.geolocation.watchPosition(updateLocation, (error) => { throw error; });
    
    gatherData();
    uploadData();
    console.log(navigator);
    setInterval(() => { gatherData(); uploadData(); }, DATA_COLLECTION_INTERVAL);
}

function updateLocation(success)
{
    data["location"] = JSON.stringify(cloneAsObject(success));
}

// updates data object with user data
function gatherData()
{
    // website size
    data["screen_width"] = window.screen.width;
    data["screen_height"] = window.screen.height;

    // device resolution
    data["resolution_width"] = window.screen.width * window.devicePixelRatio;
    data["resolution_height"] = window.screen.height * window.devicePixelRatio;

    // os
    data["os"] = navigator.oscpu;

    // browser
    data["browser"] = navigator.appCodeName;

    // lang
    data["locale"] = navigator.language;

    // platform
    data["platform"] = navigator.platform;

    // console.log(data);
}

// Uploads to api
async function uploadData()
{
    try {
        const response = await fetch(API_ENDPOINT + "/data_collection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }

        if (response.status == 401)
        {
            location.href = BASE_URL + "/login.html";
        }
    }
    catch(err) {
        alert(err);
        throw err;
    }
}

function cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key]);
    }
    return temp;
}


window.addEventListener("load", () => { onAuthed.subscribe(init); });