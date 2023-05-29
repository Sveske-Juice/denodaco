import { onAuthed } from "./modules/authmanager.js";

function userIsLoggedIn() {
    const elements = Array.from(document.getElementsByClassName("show-when-logged-in"));

    elements.forEach(element => {
        element.style.display = "block";
    });
}

window.addEventListener("load", () => {
    onAuthed.subscribe(userIsLoggedIn);
});