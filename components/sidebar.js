export function load_sidebar()
{
class sidebar extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import '../styles/sidebar/sidebar.css';
    </style>
    <div class="sidebar-container">
        <div class="small-sidebar-container">
            <button class="small-sidebar-icon" onclick="sss()"></button>
        </div>
        <div class="logo-container"></div>
        <div class="menu-container">
            <div class="user-chat-container">
                <button class="user-chat-icon"></button>
                <button class="user-chat-text" id="user-chat-text">Chat</button>
            </div>
            <div class="user-settings-container">
                <button class="user-settings-icon"></button>
                <button class="user-settings-text" id="user-settings-text">Settings</button>
            </div>
            <div class="user-profile-container">
                <button class="user-profile-icon"></button>
                <button class="user-profile-text" id="user-profile-text">Profile</button>
            </div>
        </div>
        <div class="logout-wrapper" onclick="logout_con()">
            <div class="logout-container"> 
                <button class="logout-icon"></button>
                <button class="logout-text" id="logout-text">Log out</button>
            </div> 
        </div>
    </div>
    `;
    }
    // connectedCallback() {
    connectedCallback() {
        
    }
}
customElements.define('sidebar-elements', sidebar);
}