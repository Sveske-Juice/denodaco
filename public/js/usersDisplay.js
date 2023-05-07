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
    const container = document.querySelector("#users-table");

    if (users == undefined || users.length == 0)
    {
        const text = document.createElement("p");
        text.textContent = "No users other than you registered";
        container.append(text);
        return;
    }

    users.forEach(async function(user)
    {
        // Create new row: container only for this user
        const userParentContainer = document.createElement("tr");
        container.append(userParentContainer);
        
        // Avatar
        const avatarDataCell = document.createElement("td");
        const avatarImg = document.createElement("img");
        try { // fetch avatar
            const res = await fetch(API_ENDPOINT + `/avatar?userID=${user["id"]}`, {method: "GET"});
            const rawImg = await res.blob();
            const imgObjUrl = URL.createObjectURL(rawImg);
    
            avatarImg.src = imgObjUrl;
        } catch(err) { throw err; }

        avatarDataCell.append(avatarImg);
        userParentContainer.append(avatarDataCell);

        // User id

        // Username
        const usernameDataCell = document.createElement("td");
        const usernameText = document.createElement("p");
        usernameText.textContent = user["username"];
        usernameDataCell.append(usernameText);
        userParentContainer.append(usernameDataCell);
    });

    container.style.display = "block";
}


window.addEventListener("load", () => {onAuthed.subscribe(updateUsers); });