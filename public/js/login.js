/* Code in control of signing a user in on client side, 
by requesting the api with user data. 
Gets an accesstoken and stores it as a http only cookie */

window.onload = init;
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
        console.log(data["accessToken"]);
        location.href = BASE_URL;
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}