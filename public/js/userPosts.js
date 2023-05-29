import { onAuthed } from "./modules/authmanager.js";
import { getUser } from "./modules/getUser.js";
import { getUserAvatar } from "./modules/displayUser.js";
import { createNewPost, getAllUserPosts } from "./modules/postUtils.js";

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