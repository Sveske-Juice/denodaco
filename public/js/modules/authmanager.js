/* Will display a pop-up if the user is not auth'ed with a link to signup/login.
Also hides signup and login buttons from nav bar if already logged in. Aswell as
enabling logout button. */

import { API_ENDPOINT } from "./config.js";
import { Event } from "./event.js";

let modal;
let closeBtn;


export let onAuthed;
export let onNotAuthed;

async function init()
{
    onAuthed = new Event();
    onNotAuthed = new Event();

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
    onAuthed.raise();
}

// Called on page load if user not logged in
function notAuthed()
{
    onNotAuthed.raise();
}



window.addEventListener("load", init);