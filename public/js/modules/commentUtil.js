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

export async function uploadComment(postid, content) {
    const payload = {
        "post_id": postid,
        "content": content,
    };

    try {
        const res = await fetch(API_ENDPOINT + `/upload_comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error(`Could not upload comment, reason: ${res.statusText}`);
        }

        alert("succes");
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

export function showComment(commentData) {

}