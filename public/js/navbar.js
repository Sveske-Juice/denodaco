// Loads the nav bar to the top of body. Could not find a better solution to this, except hardcoding it in the js file.

const template = document.createElement("template");

template.innerHTML = `
    <nav>
        <div class="logo"><a class="menu-item" href="index.html">Home(add logo)</a></div>
        <div class="menu">
            <a class="menu-item primary-button show-when-logged-in" id="create-post-btn">Create Post</a>
            <a class="menu-item" href="users.html">Users</a>
            <a class="menu-item" href="about.html">About</a>
            <a class="menu-item" href="profile.html">Profile</a>
        </div>
    </nav>
`;

// Insert at the top of the body
document.body.insertBefore(template.content, document.body.firstChild);