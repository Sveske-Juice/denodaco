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
    pUsername = document.querySelector("#first-name");
    pUsername = document.querySelector("#middle-names");
    pUsername = document.querySelector("#last-name");
    pUsername = document.querySelector("#country-code");
    pUsername = document.querySelector("#birthdate");
    pUsername = document.querySelector("#account-creation");
    pUsername = document.querySelector("#last-login");
    pUsername = document.querySelector("#biography");
    pUsername = document.querySelector("#email");
    
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
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

window.addEventListener("load", init);