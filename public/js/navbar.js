// Loads the nav bar to the top of body. Could not find a better solution to this, except hardcoding it in the js file.

const template = document.createElement("template");

template.innerHTML = `
    <ul class="nav-bar">
        <li><a class="active" href="index.html">Home</a></li>
        <li><a href="users.html">Users</a></li>
        <li><a href="about.html">About</a></li>
        <li style="float:right"><a href="profile.html">Profile</a></li>
        <li id="nav-login-btn" class="nav-button" style="float:right"><a href="login.html">Sign in</a></li>
        <li id="nav-signup-btn" class="nav-button" style="float:right"><a href="signup.html">Sign up</a></li>
        <li id="nav-logout-btn" class="nav-button" style="float:right; display: none;"><a href="logout.html">Logout</a></li>
    </ul>
`;

// Insert at the top of the body
document.body.insertBefore(template.content, document.body.firstChild);