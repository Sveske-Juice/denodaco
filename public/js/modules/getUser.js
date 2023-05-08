import { API_ENDPOINT } from "./config.js";

export function getUser(userID)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            const res = await fetch(API_ENDPOINT + `/get_profile_data?userID=${userID}`, {
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