/* Will display a pop-up if the user is not auth'ed with a link to signup/login.
Also hides signup and login buttons from nav bar if already logged in. Aswell as
enabling logout button. */

window.onload = init;
let modal;
let closeBtn;

async function init()
{
    // on login/signup page or something similar
    if (!requiresAuth())
        return;

    try {
        const response = await fetch(API_ENDPOINT + "/pollauth", {
            method: "GET",
        });
        if (response.ok)
            return authed();
        return notAuthed();
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

function requiresAuth()
{
    const path = window.location.pathname;
    const splitted = path.split('/');
    const file = splitted[splitted.length - 1];
    
    if (file.includes("login"))
        return false;
    
    if (file.includes("signup"))
        return false;

    return true;
}

// Called on page load if user already logged in
function authed()
{
    const logInBtn = document.querySelector("#nav-login-btn");
    const signupBtn = document.querySelector("#nav-signup-btn");
    const logoutBtn = document.querySelector("#nav-logout-btn");
    
    logInBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";
}

// Called on page load if user not logged in
function notAuthed()
{
    modal = document.querySelector("#not-logged-in-modal");
    closeBtn = document.querySelector("#not-logged-in-modal-close-btn");

    modal.style.display = "block";

    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
}