import { onAuthed } from "./modules/authmanager.js";
import { createNewPost, getUserPost } from "./modules/postUtils.js";
import { getUser } from "./modules/getUser.js";
import { getUserAvatar } from "./modules/displayUser.js";

async function init()
{
    // Get the post id that's in the url
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("post_id");

    if (!post_id) {
        const err = `No post id in URL query. It needs to be there.`;
        alert(err);
        console.error(err);
        return;
    }

    const postData = await getUserPost(post_id);

    // Get owner info
    postData["owner_user_details"] = await getUser(postData["owner_id"]);

    // Get avatar src
    postData["user_avatar_src"] = await getUserAvatar(postData["owner_id"]);

    createNewPost(document.body, postData);
}

window.addEventListener("load", () => { onAuthed.subscribe(init); });