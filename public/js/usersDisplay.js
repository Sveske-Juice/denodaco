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
        avatarImg.width = "100";
        try { // fetch avatar
            const res = await fetch(API_ENDPOINT + `/avatar?userID=${user["id"]}`, {method: "GET"});
            const rawImg = await res.blob();
            const imgObjUrl = URL.createObjectURL(rawImg);
    
            avatarImg.src = imgObjUrl;
        } catch(err) { throw err; }

        avatarDataCell.append(avatarImg);
        userParentContainer.append(avatarDataCell);

        // User id
        const idDataCell = document.createElement("td");
        const idText = document.createElement("p");
        idText.textContent = user["id"];
        idDataCell.append(idText);
        userParentContainer.append(idDataCell);

        // Username
        const usernameDataCell = document.createElement("td");
        const usernameText = document.createElement("p");
        usernameText.textContent = user["username"];
        usernameDataCell.append(usernameText);
        userParentContainer.append(usernameDataCell);
        
        // First name
        const firstNameDataCell = document.createElement("td");
        const firstNameText = document.createElement("p");
        firstNameText.textContent = user["first_name"];
        firstNameDataCell.append(firstNameText);
        userParentContainer.append(firstNameDataCell);
        
        // Middle names
        const middleNamesDataCell = document.createElement("td");
        const middleNamesText = document.createElement("p");
        middleNamesText.textContent = user["middle_names"];
        middleNamesDataCell.append(middleNamesText);
        userParentContainer.append(middleNamesDataCell);

        // Last name
        const lastNameDataCell = document.createElement("td");
        const lastNameText = document.createElement("p");
        lastNameText.textContent = user["last_name"];
        lastNameDataCell.append(lastNameText);
        userParentContainer.append(lastNameDataCell);

        // Country Code
        const ccDataCell = document.createElement("td");
        const ccText = document.createElement("p");
        ccText.textContent = user["country_code"];
        ccDataCell.append(ccText);
        userParentContainer.append(ccDataCell);

        // Birthdate
        const birthdateDataCell = document.createElement("td");
        const birthdateText = document.createElement("p");
        birthdateText.textContent = user["birthdate"];
        birthdateDataCell.append(birthdateText);
        userParentContainer.append(birthdateDataCell);

        // Account creation
        const acDataCell = document.createElement("td");
        const acText = document.createElement("p");
        acText.textContent = user["account_creation"];
        acDataCell.append(acText);
        userParentContainer.append(acDataCell);

        // Email
        const emailDataCell = document.createElement("td");
        const emailText = document.createElement("p");
        emailText.textContent = user["email"];
        emailDataCell.append(emailText);
        userParentContainer.append(emailDataCell);

        // Bio
        const bioDataCell = document.createElement("td");
        const bioText = document.createElement("textarea");
        bioText.textContent = user["biography"];
        bioDataCell.append(bioText);
        userParentContainer.append(bioDataCell);
    });

    container.style.display = "block";
}


window.addEventListener("load", () => {onAuthed.subscribe(updateUsers); });