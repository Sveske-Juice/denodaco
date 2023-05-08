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
            alert(`Error occured while trying to get response from sever: ${response.statusText}`);
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
    const container = document.querySelector("#users-parent-container");
    
    users.forEach(user => {
        console.log(`Showing ${JSON.stringify(user)}`);

        const li = document.createElement("li");
        container.append(li);

        displayUser(li, user, onUserClick);
    });
}

function onUserClick(userid)
{
    console.log("clicked " + userid);
    location.href = BASE_URL + `/user.html?id=${userid}`;
}


window.addEventListener("load", () => {onAuthed.subscribe(updateUsers); });