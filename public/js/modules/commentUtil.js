import { API_ENDPOINT } from "./config.js";

export async function getAllCommentsInPost(postid) {
    try {
        const res = await fetch(API_ENDPOINT + `/get_all_comments?post_id=${postid}`, {
            method: "GET"
        });

        if (!res.ok) {
            throw new Error(`Could not fetch comments, reason: ${res.statusText}`);
        }

        return await res.json();
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

export function showComment(commentData) {
    
}