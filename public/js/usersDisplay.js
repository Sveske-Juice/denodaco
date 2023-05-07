async function displayUsers()
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
        alert(JSON.stringify(users));
    }
    catch(err)
    {
        alert(err);
        throw err;
    }
}


window.addEventListener("load", () => {onAuthed.subscribe(displayUsers); });