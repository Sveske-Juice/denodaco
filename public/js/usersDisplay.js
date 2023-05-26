import { displayUser } from "./modules/displayUser.js";
import { API_ENDPOINT, BASE_URL } from "./modules/config.js";
import { onAuthed } from "./modules/authmanager.js";

async function updateUsers()
{
    try
    {
        const response = await fetch(API_ENDPOINT + "/get_all_users", {
            method: "GET",
        });

        if (!response.ok)
        {
            alert(`Error occured while trying to get users from backend: ${response.statusText}`);
            return;
        }

        const users = await response.json();
        displayUsers(users);
    }
    catch(err)
    {
        alert(err);
        throw err;
    }
}

function displayUsers(users)
{
    const container = document.getElementsByClassName("users-parent-container")[0];
    console.log(container)
    users.forEach(user => {
        displayUser(container, user, onUserClick);
    });
}

function onUserClick(userid)
{
    console.log("clicked " + userid);
    location.href = BASE_URL + `/user.html?id=${userid}`;
}


window.addEventListener("load", () => {onAuthed.subscribe(updateUsers); });