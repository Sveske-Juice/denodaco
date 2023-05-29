import { API_ENDPOINT } from "./modules/config.js";

const createPostModalId = "create-post-modal";
const createPostCloseBtnId = "#create-post-close-btn";
const createPostCancelId = "#create-post-cancel";
const createPostUploadBtnId = "#create-post-upload-btn";
const createPostTitleId = "#create-post-title";
const createPostContentId = "#create-post-content";

let showing = false;

let src = `
<div class="modal create-post-modal" id="create-post-modal">
    <div class="modal-header">
        <h2>Create Post</h2>
        <span id="create-post-close-btn" class="close">&times;</span>
    </div>
    <div class="create-post-modal-content">
        <div class="create-post-title">
            <span>Title:</span>
            <textarea rows="1" cols="50" id="create-post-title"></textarea>
        </div>
        <div class="create-post-content">
            <div class="textarea-wrapper"><textarea id="create-post-content"></textarea></div>
        </div>
    <div class="create-post-footer">
        <a class="primary-button" id="create-post-upload-btn">Post</a>
        <a class="danger-button" id="create-post-cancel">Cancel</a>
    </div>
</div>
`;

function create()
{
    const template = document.createElement("template");
    template.innerHTML = src;
    document.body.appendChild(template.content);

    const modal = document.getElementById(createPostModalId);
    
    
    modal.querySelector(createPostCloseBtnId).addEventListener("click", destroy);
    modal.querySelector(createPostCancelId).addEventListener("click", destroy);
    
    modal.querySelector(createPostUploadBtnId).addEventListener("click", upload);

    showing = true;
}

function destroy()
{
    const modal = document.getElementById(createPostModalId);
    
    // Cleanup, see https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements
    modal.querySelector(createPostCloseBtnId).removeEventListener("click", destroy);
    modal.querySelector(createPostCancelId).removeEventListener("click", destroy);
    modal.querySelector(createPostUploadBtnId).removeEventListener("click", upload);
    
    modal.remove();
    
    showing = false;
}

function toggleModal() {
    if (showing) {
        // Delete modal
        destroy()
        return;
    }
    
    // Show modal
    create()
}

// Uploads the post
async function upload() {
    const modal = document.getElementById(createPostModalId);

    const title = modal.querySelector(createPostTitleId).value;
    const content = modal.querySelector(createPostContentId).value;

    try {
        const res = await fetch(API_ENDPOINT + "/upload_post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"title": title, "content": content}),
        });

        if (!res.ok)
        {
            alert(res.statusText);
            return;
        }

        alert("Success");
    }
    catch (err)
    {
        alert(err);
        throw err;
    }
}

window.addEventListener("load", () => {
    document.getElementById("create-post-btn").addEventListener("click", toggleModal);
});