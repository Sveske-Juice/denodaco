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
    
    onAuthed.subscribe(displayProfileSettings);
}

async function displayProfileSettings()
{
    try {
        // Send GET req to api. access token stores username and will be sent along with it.
        const response = await fetch(API_ENDPOINT + "/get_profile_data", {
            method: "GET"
        });

        const data = await response.json();
        
        // Set data
        pUsername.textContent = data["username"];
        pFirstName.textContent = data["first_name"];
        pMiddleNames.textContent = data["middle_names"];
        pLastName.textContent = data["last_name"];
        pCountryCode.textContent = data["country_code"];
        pBirthdate.textContent = data["birthdate"];
        pAccountCreation.textContent = data["account_creation"];
        pLastLogin.textContent = data["last_login"];
        pEmail.textContent = data["email"];

        if (data["biography"])
            pBiography.textContent = data["biography"];
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

window.addEventListener("load", init);