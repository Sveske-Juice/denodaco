/* Code in control of signing a user up on client side, by requesting the api with user data */

import { BASE_URL, API_ENDPOINT } from "./modules/config.js";

let signupBtn;

function init()
{
    // Add signup btn callback
    signupBtn = document.querySelector("#signup-btn");
    signupBtn.addEventListener("click", signup);
}

async function signup()
{
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const email = document.querySelector("#email").value;
    const first_name = document.querySelector("#first_name").value;
    const middle_names = document.querySelector("#middle_names").value;
    const last_name = document.querySelector("#last_name").value;
    const country_code = document.querySelector("#country_code").value;
    const birthdate = document.querySelector("#birthdate").value;

    const userData = JSON.stringify({
        "username":     username,
        "password":     password,
        "email":        email,
        "first_name":   first_name,
        "middle_names": middle_names,
        "last_name":    last_name,
        "country_code": country_code,
        "birthdate":    birthdate,
    });

    console.log(`Uploading ${userData}`);
    try {
        const response = await fetch(API_ENDPOINT + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: userData,
        });
        
        if (response.status !== 200)
        {
            alert(`An error occured while trying to sign in. \nReason: ${response.statusText}`);
            return;
        }

        location.href = BASE_URL;
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

window.addEventListener("load", init);