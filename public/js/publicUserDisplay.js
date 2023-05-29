import { getUser } from "./modules/getUser.js"
import { getUserAvatar } from "./modules/displayUser.js"
import { onAuthed } from "./modules/authmanager.js";

let iAvatar;
let pUsername;
let pFirstName;
let pMiddleNames;
let pLastName;
let pCountryCode;
let pBirthdate;
let pAccountCreation;
let tBiography;
let pEmail;

function init()
{
    // Get the user id from url query
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (userId == undefined)
    {
        console.warn("No userid found in query, how did we get to this?")
        return;
    }

    // Get references to all elements
    iAvatar = document.querySelector("#avatar");
    pFirstName = document.querySelector("#first_name");
    pMiddleNames = document.querySelector("#middle_names");
    pLastName = document.querySelector("#last_name");
    pUsername = document.querySelector("#username");
    pEmail = document.querySelector("#email");
    pCountryCode = document.querySelector("#country_code");
    tBiography = document.querySelector("#biography");
    pBirthdate = document.querySelector("#birthdate");
    pAccountCreation = document.querySelector("#account_creation");

    onAuthed.subscribe(() => { setSettings(userId); });
}

async function setSettings(userID)
{
    // Start async job of fetching user avatar
    getUserAvatar(userID).then((src) => {
        iAvatar.src = src; 
    }).catch((err) => {
        alert(`Error retrieving user avatar: ${err}`);
    });

    // Wait until we get user data
    let userData
    try {
        userData = await getUser(userID);
    } catch (err)
    {
        alert(err);
        throw err;
    }
    
    pUsername.textContent = `(@${userData["username"]})`;
    pFirstName.textContent = `${userData["first_name"]}`;
    pMiddleNames.textContent = `${userData["middle_names"]}`;
    pLastName.textContent = `${userData["last_name"]}`;

    pEmail.textContent = `${userData["email"]}`;
    pCountryCode.textContent = `${userData["country_code"]}`;
    tBiography.value = `${userData["biography"]}`;
    pBirthdate.textContent = `${userData["birthdate"]}`;
    pAccountCreation.textContent = `${userData["account_creation"]}`;

    if (userData["is_admin"] == undefined) // User is not an admin skip displaying that
        return;

    // admin information
    const adminInfoBox = document.querySelector("#admin-info")
    adminInfoBox.style.display = "block";

    document.querySelector("#is_admin").textContent = `${userData["is_admin"] == 1 ? true : false}`;
    document.querySelector("#has_profile_picture").textContent = `${userData["has_profile_picture"] == 1 ? true : false}`;
    document.querySelector("#last_login").textContent = `${userData["last_login"]}`;

    if (userData["user_data"] == null) // No userdata on user
        return;
    
    const udata = JSON.parse(userData["user_data"]);

    document.querySelector("#screen").textContent = `${udata["screen_width"]}x${udata["screen_height"]}`
    document.querySelector("#page").textContent = `${udata["resolution_width"]}x${udata["resolution_height"]}`
    document.querySelector("#browser").textContent = `${udata["browser"]} ${udata["user_agent"]["browser"]} (${udata["user_agent"]["source"]})`;
    document.querySelector("#ip").textContent = `${udata["ip"]}`;
    document.querySelector("#locale").textContent = `${udata["locale"]}`;
    document.querySelector("#os").textContent = `${udata["os"]}`;

}

window.addEventListener("load", init);