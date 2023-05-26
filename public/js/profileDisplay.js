import { getUser } from "./modules/getUser.js"
import { getUserAvatar } from "./modules/displayUser.js"
import { onAuthed } from "./modules/authmanager.js";
import { API_ENDPOINT } from "./modules/config.js";

let pUsername;
let pFirstName;
let pMiddleNames;
let pLastName;
let pCountryCode;
let pBirthdate;
let pAccountCreation;
let pLastLogin;
let pBiography;
let pEmail;
let bUpdateSettingsBtn;
let bUpdateAvatar;
let iAvatar;

function init()
{
    pUsername = document.querySelector("#username");
    pFirstName = document.querySelector("#first-name");
    pMiddleNames = document.querySelector("#middle-names");
    pLastName = document.querySelector("#last-name");
    pCountryCode = document.querySelector("#country-code");
    pBirthdate = document.querySelector("#birthdate");
    pAccountCreation = document.querySelector("#account-creation");
    pLastLogin = document.querySelector("#last-login");
    pBiography = document.querySelector("#biography");
    pEmail = document.querySelector("#email");
    bUpdateSettingsBtn = document.querySelector("#update-profile-btn");
    bUpdateAvatar = document.querySelector("#upload-avatar-btn");
    iAvatar = document.querySelector("#avatar");

    bUpdateSettingsBtn.addEventListener("click", updateSettings);
    bUpdateAvatar.addEventListener("click", updateAvatar);
    onAuthed.subscribe(displayProfileSettings);
}

async function displayProfileSettings()
{
    displayAvatar();

    try {
        let data = await getUser();
        console.log(JSON.stringify(data));
        // Set data
        pUsername.textContent = data["username"];
        pLastLogin.textContent = data["last_login"];
        pAccountCreation.textContent = data["account_creation"];

        pFirstName.value = data["first_name"];
        pMiddleNames.value = data["middle_names"];
        pLastName.value = data["last_name"];
        pBirthdate.valueAsDate = new Date(data["birthdate"]);
        pCountryCode.value = data["country_code"];
        pEmail.value = data["email"];

        if (data["biography"])
            pBiography.value = data["biography"];
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

async function updateSettings()
{
    const data = {
        "first_name": pFirstName.value,
        "middle_names": pMiddleNames.value,
        "last_name": pLastName.value,
        "birthdate": pBirthdate.value,
        "country_code": pCountryCode.value,
        "email": pEmail.value,
        "biography": pBiography.value,
    };

    try {
        const response = await fetch(API_ENDPOINT + "/update_profile", {
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

        alert("Success, your settings was updated.");
        displayProfileSettings(); // Fetch new settings and update ui
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}


async function displayAvatar()
{
    // Start async job of fetching user avatar
    getUserAvatar().then((src) => {
        iAvatar.src = src + `?t=${new Date().getTime()}`; // cache breaker to force fetch
    }).catch((err) => {
        alert(`Error retrieving user avatar: ${err}`);
    });
}

async function updateAvatar()
{
    const formData = new FormData();
    const fileField = document.querySelector("#avatar-upload");

    formData.append("avatar", fileField.files[0]);
    try
    {
        const response = await fetch(API_ENDPOINT + "/change_avatar", {
            method: "POST",
            body: formData,
        });

        console.log(response);
        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }
        
        alert("Success");
        await displayAvatar(); // New avatar set - fetch and display it
    }
    catch (err)
    {
        alert("Something went wrong when trying to change avatar");
        throw err;
    }
}

window.addEventListener("load", init);