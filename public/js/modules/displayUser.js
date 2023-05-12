// Driver for displaying a user in a nice format
import { API_ENDPOINT } from "./config.js";

export function displayUser(parent, userdata, clickCallback = null)
{
    const container = document.createElement("div");
    if (clickCallback != null)
        container.addEventListener("click", () => { clickCallback(userdata["id"]); });
    container.class = "user-container";
    container.id = userdata["id"];
    parent.append(container);
    
    const avatar = document.createElement("img");
    container.append(avatar);
    getUserAvatar(userdata["id"]).then((src) => avatar.src = src);

    const displayName = document.createElement("span");
    displayName.class = "displayname";
    displayName.textContent = `${userdata["first_name"]} ${userdata["last_name"]}`;
    container.append(displayName);

    const username = document.createElement("span");
    username.class = "username";
    username.textContent = `(@${userdata["username"]})`;
    container.append(username);

    
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