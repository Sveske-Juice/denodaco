window.addEventListener("load", async () => {
    try {
        const response = await fetch(API_ENDPOINT + "/logout", )
        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }
        document.querySelector("#status").textContent = "Succesfully logged out. Returning to home in 3 seconds...";
        setTimeout(() => { location.href = BASE_URL; }, 3000);
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
});