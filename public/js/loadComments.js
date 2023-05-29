import { onNewPostCreated } from "./modules/postUtils.js";
import { getAllCommentsInPost, showComment } from "./modules/commentUtil.js";
import { getUser } from "./modules/getUser.js";
import { getUserAvatar } from "./modules/displayUser.js";

async function loadComments() {
    // Get the post id that's in the url
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("post_id");

    const commentSection = document.getElementById("comment-section");

    const comments = Array.from(await getAllCommentsInPost(post_id));

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // Get owner info
        comment["owner_user_details"] = await getUser(comment["owner_id"]);

        // Get avatar src
        comment["user_avatar_src"] = await getUserAvatar(comment["owner_id"]);

        showComment(commentSection, comment);
    }
}

window.addEventListener("load", () => { onNewPostCreated.subscribe(loadComments); });