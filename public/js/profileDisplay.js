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

    bUpdateSettingsBtn.addEventListener("click", updateSettings);
    bUpdateAvatar.addEventListener("click", updateAvatar);
    onAuthed.subscribe(displayProfileSettings);
}

async function displayProfileSettings()
{
    displayAvatar();
    try {
        // Send GET req to api. access token stores username and will be sent along with it.
        const response = await fetch(API_ENDPOINT + "/get_profile_data", {
            method: "GET"
        });

        const data = await response.json();
        
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
    try
    {
        const response = await fetch(API_ENDPOINT + "/avatar", {
            method: "GET"
        });

        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }

        const rawImg = await response.blob();
        const imgObjUrl = URL.createObjectURL(rawImg);

        const imageHolder = document.querySelector("#avatar");
        imageHolder.src = imgObjUrl;
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
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
        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }
        
        alert("Success");
        displayAvatar(); // New avatar set - fetch and display it
    }
    catch (err)
    {
        alert(response.statusText);
        throw err;
    }
}

window.addEventListener("load", init);