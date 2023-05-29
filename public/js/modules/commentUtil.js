import { API_ENDPOINT } from "./config.js";


let avatarId = "#avatar";
let authorId = "#author";
let creationId = "#creation";
let contentId = "#comment-content";

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
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

export function showComment(parent, commentData) {
    console.log(commentData);
    const commentTemplate = document.getElementById("comment-template");

    const container = commentTemplate.content.firstElementChild.cloneNode(true);

    // Set comment data
    const avatar = container.querySelector(avatarId);
    avatar.src = commentData["user_avatar_src"];

    const author = container.querySelector(authorId);
    author.innerHTML = `<a href=user.html?id=${commentData["owner_id"]}>@${commentData["owner_user_details"]["username"]}</a> replied at`;
    
    const creation = container.querySelector(creationId);
    creation.textContent = `${commentData["creation"]}:`;

    const content = container.querySelector(contentId);
    content.value = commentData["content"];

    parent.appendChild(container);
}