/* Will display a pop-up if the user is not auth'ed with a link to signup/login.
Also hides signup and login buttons from nav bar if already logged in. Aswell as
enabling logout button. */

import { API_ENDPOINT } from "./config.js";

let modal;
let closeBtn;

function Event() {
    this.handlers = [];
}

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
    const logInBtn = document.querySelector("#nav-login-btn");
    const signupBtn = document.querySelector("#nav-signup-btn");
    const logoutBtn = document.querySelector("#nav-logout-btn");
    
    onAuthed.raise();
}

// Called on page load if user not logged in
function notAuthed()
{
    onNotAuthed.raise();
    modal = document.querySelector("#not-logged-in-modal");
    closeBtn = document.querySelector("#not-logged-in-modal-close-btn");

    modal.style.display = "block";

    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
}

Event.prototype = {
    subscribe: function(fn)
    {
        // Add subscriber callback function pointer to handlers
        this.handlers.push(fn);
    },

    unsubscribe: function(fn)
    {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    raise: function(data, thisObj)
    {
        let scope = thisObj || window;
        this.handlers.forEach(function(handler) {
            handler.call(scope, data);
        })
    }
}

window.addEventListener("load", init);