import { onAuthed } from "./modules/authmanager.js";
import { API_ENDPOINT } from "./modules/config.js";
import { getUser } from "./modules/getUser.js";
import { getUserAvatar } from "./modules/displayUser.js";

const postHyperlinkId = "#post-hyperlink";
const authorId = "#author";
const creationDateId = "#creation-date";
const titleId = "#title";
const contentId = "#content";
const commentsBtnId = "#comments-button";

function createNewPost(parent, postData) {
    const postTemplate = document.getElementById("post-template");
    if (!postTemplate)
    {
        console.error("No post templates found in page");
        return null;
    }
    const container = postTemplate.content.firstElementChild.cloneNode(true);
    
    const showPostUrl = `post.html?post_id=${postData["id"]}`;

    container.querySelector(postHyperlinkId).href = showPostUrl;
    
    // Set post data to newly container
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

async function getAllUserPosts()
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

async function init()
{
    const parent = document.getElementById("posts-parent");
    if (!parent) {
        console.error("No parent to hold the posts");
        return;
    }

    const data = await getAllUserPosts();
    // console.log(data);
    data.forEach(async (post) => {
        
        // Get owner info
        post["owner_user_details"] = await getUser(post["owner_id"]);

        // Get avatar src
        post["user_avatar_src"] = await getUserAvatar(post["owner_id"]);
        
        console.log(post);
        createNewPost(parent, post);
    });
}


window.addEventListener("load", () => { onAuthed.subscribe(init); });