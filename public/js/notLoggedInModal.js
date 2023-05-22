import { onNotAuthed } from "./modules/authmanager.js";

const template = document.createElement("template");

template.innerHTML = `
<div id="not-logged-in-modal" class="modal">
    <div class="modal-header">
        <span id="not-logged-in-modal-close-btn" class="close">&times;</span>
    </div>
    <div id="not-logged-in-modal-title">
        <h1>You need to be logged in to view this content. </h1>
    </div>
    <div class="modal-content">
        <div id="not-logged-in-modal-login">
            <p class="subtitle">Already have an account?</p>
            <a class="primary-button" href="login.html">Login</a>
            </div>
            <div id="not-logged-in-modal-signup">
            <p class="subtitle">New to Denodaco?</p>
            <a class="primary-button" href="signup.html">Signup</a>
        </div>
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
