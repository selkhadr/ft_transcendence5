export function load_newhome()
{
class newhome extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import '../styles/home/home.css';
        @import '../styles/sidebar/sidebar.css';
    </style>
    
    <div class="head-container">
        <div class="lang-mode-container">
            <div class="lang-container">
                <div class="select-lang" onclick="lang_select()" id="select-lang"></div>
                <div class="lang-option" style="display: none;" onclick="changeLang()" id="lang-option">
                    <div class="lng-img"></div>
                    <ul>
                        <li><a href="?lang=fr"></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <h1 class="welcome-txt" id="welcome-txt">Welcome!👋</h1>
        <button class="start-playing" id="start-playing" onclick="select_games();">
            <img src="../styles/sidebar/icons/ping-pongg.svg " class="ping-image" >
            start playing</button>
    </div>
    <div class="sidebar-container">
    <div class="small-sidebar-container">
        <button class="small-sidebar-icon" onclick="sss()"></button>
    </div>
    <div class="logo-container"></div>
    <div class="menu-container">
    <div class="user-home-container">
            <button class="user-home-icon" onclick="go_to_newhome();"></button>
            <button class="user-home-text" id="user-chat-text" onclick="go_to_newhome();">Home</button>
        </div>
        <div class="user-chat-container">
            <button class="user-chat-icon" onclick="go_to_chat();"></button>
            <button class="user-chat-text" id="user-chat-text" onclick="go_to_chat();">Chat</button>
        </div>
        <div class="user-tr-container">
            <button class="user-tr-icon" onclick="go_to_chat();"></button>
            <button class="user-tr-text" id="user-chat-text" onclick="go_to_chat();">Tournament</button>
        </div>
        <div class="user-settings-container">
            <button class="user-settings-icon" onclick="go_to_settings();"></button>
            <button class="user-settings-text" id="user-settings-text" onclick="go_to_settings();">Settings</button>
        </div>
        <div class="user-profile-container">
            <button class="user-profile-icon" onclick="go_to_profile();"></button>
            <button class="user-profile-text" id="user-profile-text" onclick="go_to_profile();">Profile</button>
        </div>
    </div>
    <div class="logout-wrapper" onclick="logout_con()">
        <div class="logout-container"> 
            <button class="logout-icon"></button>
            <button class="logout-text" id="logout-text">Log out</button>
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
    // connectedCallback() {
    connectedCallback() {


        load_sidebar();
    }
}
customElements.define('newhome-elements', newhome);
}