import { API_ENDPOINT } from "./config.js";

export function getUser(userID = undefined)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            let url = API_ENDPOINT + `/get_profile_data`;
            if (userID != undefined)
            {
                url += `?userID=${userID}`;
            }

            const res = await fetch(url, {
                method: "GET",
            });
    
            if (!res.ok)
            {
                return reject(res.statusText);
            }
    
            const data = await res.json();
            resolve(data);
        }
        catch(err)
        {
            return reject(err);
        }
    });
}