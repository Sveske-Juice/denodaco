// Driver for displaying a user in a nice format
import { API_ENDPOINT } from "./config.js";

export function displayUser(parent, userdata, clickCallback = null)
{
    // Clone user container template for new user to display
    const template = document.getElementById("user-container-template");
    const container = template.content.firstElementChild.cloneNode(true);
    parent.appendChild(container);

    // Setup click callback
    if (clickCallback != null)
        container.addEventListener("click", () => { clickCallback(userdata["id"]); });

    container.id = userdata["id"];

    // Start async job of setting avatar src
    const avatar = container.querySelector("#avatar");
    getUserAvatar(userdata["id"]).then((src) => avatar.src = src);

    const displayName = container.querySelector("#full-name");
    displayName.textContent = `${userdata["first_name"]} ${userdata["middle_names"]} ${userdata["last_name"]}`;

    const username = container.querySelector("#username");
    username.textContent = `(@${userdata["username"]})`;
}

export function getUserAvatar(userid = undefined)
{
    return new Promise(async (resolve, reject) => {
        let url = API_ENDPOINT + `/avatar?redirect=false`;
        if (userid != undefined)
        {
            url += `&userID=${userid}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok)
            {
                alert(`Error occured while trying to get user avatar: HTTP CODE ${res.status} summary: ${res.statusText}`);
                return reject(res.statusText);
            }

            const data = await res.json();
            resolve(data["src"]);
        }
        catch(err)
        {
            reject(err);
        }
    });
}