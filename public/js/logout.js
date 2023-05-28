import { BASE_URL, API_ENDPOINT } from "./modules/config.js";

window.addEventListener("load", async () => {
    try {
        const response = await fetch(API_ENDPOINT + "/logout", )
        if (!response.ok)
        {
            alert(response.statusText);
            return;
        }
        document.querySelector("#status").textContent = "Succesfully logged out. Returning to home in 1 seconds...";
        setTimeout(() => { location.href = BASE_URL; }, 1000);
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
});