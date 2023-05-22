import { onNotAuthed } from "./modules/authmanager.js";

const template = document.createElement("template");

template.innerHTML = `
<div id="not-logged-in-modal" class="modal">
<div class="modal-content">
    <span id="not-logged-in-modal-close-btn" class="close">&times;</span>
    <p>You need to be logged in to view this content.</p>
    <center><a href="login.html">Log in</a></center>
    <br>
    <center><p>or</p></center>
    <br>
    <center><a href="signup.html">Sign up</a></center>
</div>
</div>
`;

function showNotLoggedInModal()
{
    console.log("not logged in");
    document.body.appendChild(template.content);

    const closeBtn = document.getElementById("not-logged-in-modal-close-btn");
    const modal = document.getElementById("not-logged-in-modal");

    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
}

function init()
{
    onNotAuthed.subscribe(showNotLoggedInModal);
}

window.addEventListener("load", init);