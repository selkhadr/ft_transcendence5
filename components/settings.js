export function load_settings()
{

class settings extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import './dashboard/dash_frontend/user-settings/head.css';
        @import '../styles/sidebar/sidebar.css';
        @import './dashboard/dash_frontend/user-settings/settings.css';
    </style>
    <div class="head-container">
    <input id="file" type="file" class="input" onchange="loadFile(event)"/>
    <div class="pfp-square" id="pfp">
        <label class="label" for="file">
            <span>Change Image</span>
        </label>
    </div>
    <div class="content-container">
        <div class="first-last">
            <h3 id="first-last">First-name & last-name</h3>
        </div>
        <div class="Username" id="username">Username</div>
        <div class="pfp-txt">please ensure that your image is in one of these formats: <br>
            <strong>JPEG</strong>, <strong>PNG</strong> or <strong>JPG</strong></div>
    </div>
</div>
<div class="sidebar-container">
    <div class="small-sidebar-container">
        <button class="small-sidebar-icon" onclick="sss()"></button>
    </div>
    <div class="logo-container"></div>
    <div class="menu-container">
        <div class="user-home-container">
            <button class="user-home-icon" onclick="go_to_newhome();"></button>
            <button class="user-home-text" onclick="go_to_newhome();">Home</button>
        </div>
        <div class="user-chat-container">
            <button class="user-chat-icon" onclick="go_to_chat();"></button>
            <button class="user-chat-text" onclick="go_to_chat();">Chat</button>
        </div>
        <div class="user-tr-container">
            <button class="user-tr-icon" onclick="go_to_chat();"></button>
            <button class="user-tr-text" id="user-chat-text" onclick="go_to_chat();">Tournament</button>
        </div>
        <div class="user-settings-container">
            <button class="user-settings-icon" onclick="go_to_settings();"></button>
            <button class="user-settings-text" onclick="go_to_settings();">Settings</button>
        </div>
        <div class="user-profile-container">
            <button class="user-profile-icon" onclick="go_to_profile();"></button>
            <button class="user-profile-text" onclick="go_to_profile();">Profile</button>
        </div>
    </div>
    <div class="logout-wrapper" onclick="logout_con()">
        <div class="logout-container"> 
            <button class="logout-icon"></button>
            <button class="logout-text">Log out</button>
        </div>
    </div>
</div>
<div class="body-container">
    <div class="column-container">
        <div class="edit-profile-container">
            <button class="edit-profile" onclick="showEditProfile()">Edit Profile</button>
        </div>
        <div class="change-password-button-container">
            <button class="change-password"onclick="showChangePassword()">Change Password</button>
        </div>
    </div>
    <div class="change-name-container">
        <div class="first-name">First Name:</div>
        <div class="name-area-wrapper">
            <img src="./dashboard/dash_frontend/icons/profile.svg" alt="icon" class="name-icon">
            <textarea class="name-area" id="fullname_txt"></textarea>
        </div>
        <div class="username">
            <p>Last Name:</p>
        </div>
        <div class="username-wrapper">
            <img src="./dashboard/dash_frontend/icons/online-hover.svg" alt="icon" class="name-icon">
            <textarea class="username-area" id="username_txt"></textarea>
        </div>
        <div class="name-status-container">
            <p id="success-txt" class="stats-text" style="display: none;">Your info has been updated successfully!</p>
        </div>
        <div class="update-delete">
            <button class="delete">Delete User</button>
            <button class="enter" id="updatee_name" onclick="verify_info()">Submit</button>
        </div>
    </div>
    <div class="change-password-container" style="display: none;">
        <div class="old-password">
            <p>Old Password:</p>
            <p1 id="p1_pass">Password doesn't match.</p1>
        </div>
        <div class="old-pass-wrapper">
            <input class="old-pass-area" type="password" id="old_pass"></input>
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('old-pass-area')">
                <img src="./dashboard/dash_frontend/icons/eye.svg" alt="Show Password" class="toggle-icon">
            </button>
        </div>
        <div class="new-password">New Password:</div>
        <div class="new-pass-wrapper">
            <input class="new-pass-area" type="password"></input>
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('new-pass-area')">
                <img src="./dashboard/dash_frontend/icons/eye.svg" alt="Show Password" class="toggle-icon">
            </button>
        </div>
        <div class="repeat-new-password">Repeat New Password:</div>
        <div class="repeat-new-password-wrapper">
            <input class="repeat-new-password-area" type="password" id="rp_pass"></input>
            <button type="button" class="toggle-password" onclick="togglePasswordVisibility('repeat-new-password-area')">
                <img src="./dashboard/dash_frontend/icons/eye.svg" alt="Show Password" class="toggle-icon">
            </button>
        </div>
        <div class="password-status-container">
            <p class="stats-text" style="display: none;">Your password has been updated successfully!</p>
        </div>
        <div class="update-cancel">
            <button class="cancel">Cancel</button>
            <button class="enter" id="updatee" onclick="verify()">Submit</button>
        </div>
    </div>
</div>
<div class="logoutpop-container" style="display: none;">
        <div class="logoutpop-box">
                <p class="logoutpop-text" id="logoutpop-tex">are you sure you want to logout?</p>
            <div class="update-cancel-logout">
                <button class="cancel-log" id="cancel-log" onclick="closeLogOutBox()">No</button>
                <button class="enter-log" id="enter-log" onclick="logout()">Yes</button>
            </div>
        </div>
    </div>
    `;
}
connectedCallback() {
    fetch('http://127.0.0.1:8001/api/user/', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        fetch(`http://127.0.0.1:8004/user-setting/${data.username}/`, {
            method:'GET',
        })
        
            .then(response => response.json())
            .then(data => {
                let full_name = data.full_name.split(' ');
                let first_name = full_name[0];
                let last_name = full_name.slice(1).join(' ');

                document.getElementById('fullname_txt').value = first_name;
                document.getElementById('username_txt').value = last_name;
                updateData(data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
        });
    })
   
}

}
customElements.define('settingss-elements', settings);
}

