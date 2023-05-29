import { API_ENDPOINT } from "./modules/config.js";

const postHyperlinkId = "#post-hyperlink";
const avatarId = "#avatar";
const authorId = "#author";
const creationDateId = "#creation-date";
const titleId = "#title";
const contentId = "#content";
const commentsBtnId = "#comments-button";

export function createNewPost(parent, postData) {
    const postTemplate = document.getElementById("post-template");
    if (!postTemplate)
    {
        console.error("No post templates found in page");
        return null;
    }
    const container = postTemplate.content.firstElementChild.cloneNode(true);
    
    const showPostUrl = `post.html?post_id=${postData["id"]}`;

    const hyperlink = container.querySelector(postHyperlinkId);
    if (hyperlink)
        hyperlink.href = showPostUrl;
    
    // Set post data to newly container
    const avatar = container.querySelector(avatarId);
    avatar.src = postData["user_avatar_src"];

    
    const author = container.querySelector(authorId);
    author.innerHTML = `Posted by <a href="user.html?id=${postData["owner_id"]}"> @${postData["owner_user_details"]["username"]}</a>`;

    const creationDate = container.querySelector(creationDateId);
    creationDate.textContent = `at ${postData["creation"]}`;

    const title = container.querySelector(titleId);
    title.textContent = postData["title"];

    const content = container.querySelector(contentId);
    content.textContent = postData["content"];
    
    const commentsBtn = container.querySelector(commentsBtnId);
    commentsBtn.href = showPostUrl;

    parent.appendChild(container);
}

export async function getUserPost(post_id) {
    try {
        const res = await fetch(API_ENDPOINT + `/get_user_post?id=${post_id}`, {
            method: "GET"
        });

        if (!res.ok) {
            alert(`Could not fetch user post: ${res.statusText}`);
            return;
        }

        return await res.json();
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

export async function getAllUserPosts()
{
    try {
        const res = await fetch(API_ENDPOINT + "/get_all_user_posts", {
            method: "GET"
        });

        if (!res.ok) {
            alert(`Could not fetch user posts: ${res.statusText}`);
            return;
        }

        return await res.json();
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}
