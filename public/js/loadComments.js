import { onAuthed } from "./modules/authmanager.js";
import { getAllCommentsInPost, showComment } from "./modules/commentUtil.js";

async function loadComments() {
    // Get the post id that's in the url
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("post_id");

    const comments = await getAllCommentsInPost(post_id);
    comments.forEach(comment => {
        showComment(comment);
    });
}

window.addEventListener("load", () => { onAuthed.subscribe(loadComments); });