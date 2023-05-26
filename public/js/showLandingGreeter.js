// Shows a not-logged-in greeter if the user isn't signed in, with links to signup etc.
// otherwise welcomes the logged in user

import { onAuthed, onNotAuthed } from "./modules/authmanager.js";

function userIsLoggedIn() {
    // Enable logged in greeter
    const loggedInGreeter = document.getElementById("logged-in");
    loggedInGreeter.style.display = "block";

    loggedInGreeter.querySelector("#welcome-text").textContent = `Welcome back ${localStorage.getItem("username").replace(/^"(.*)"$/, '$1')}!`;
}

function userIsNotLoggedIn() {
    document.getElementById("not-logged-in").style.display = "block";
}

window.addEventListener("load", () => {
    onAuthed.subscribe(userIsLoggedIn);
    onNotAuthed.subscribe(userIsNotLoggedIn);
});