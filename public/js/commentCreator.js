import { uploadComment } from "./modules/commentUtil.js";
import { onNewPostCreated } from "./modules/postUtils.js";

let commentContentId = "create-comment-content";
let postCommentBtnId = "post-button";

function init() {
    // Get the post id that's in the url
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("post_id");

    const uploadBtn = document.getElementById(postCommentBtnId);
    
    uploadBtn.addEventListener("click", () => {
        const contentElement = document.getElementById(commentContentId);
        uploadComment(post_id, contentElement.value).then(() => {
            location.reload();
        })
    });
}

window.addEventListener("load", () => { onNewPostCreated.subscribe(init); });