/* Code in control of signing a user in on client side, 
by requesting the api with user data. 
Gets an accesstoken and stores it as a http only cookie */

import { BASE_URL, API_ENDPOINT } from "./modules/config.js";

let signinBtn;

function init()
{
    signinBtn = document.querySelector("#login-btn")
    signinBtn.addEventListener("click", signin);
}

async function signin()
{
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch(API_ENDPOINT + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": username, "password": password}),
        });

        if (response.status !== 200)
        {
            alert(response.statusText);
            return;
        }

        const data = await response.json();
        localStorage.setItem("username", JSON.stringify(data["username"]));
        localStorage.setItem("user_id", JSON.stringify(data["user_id"]));

        location.href = BASE_URL;
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

window.addEventListener("load", init);