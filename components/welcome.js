export function load_welcome()
{
class welcome extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import './styles/welcome/welcome.css';
    </style>
        <h1 class="welcome-txt">Welcome to PingPong!</h1>
        <h2 class="welcome-txt2">a simple platform where you can play ping-pong and chat with friends!</h2>
        <button class="start-playing" onclick="go_to_login()">
            <img src="./styles/welcome/piingg.gif" class="ping-image">
            Log in</button>
    `;
    }
    connectedCallback() {
        console.log("connected to welcome page");
    }
}
customElements.define('welcome-elements', welcome);
}