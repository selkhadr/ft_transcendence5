export function load_login()
{
class login extends HTMLElement {
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import './Authentication/frontend/login.css';
    </style>
    <div class="authentication">
    <div class="login">
            <img src="../../game/img/logo.svg" alt="" srcset="">
            <input type="text" id="email" placeholder="email", value="eloualy000@gmail.com">
            <input type="text" id="password" placeholder="password" , value="newpassword">
            <div class="forget_password">
                <a href="">Forgot password?</a>
            </div>
            
            <button class="loginx" onclick="login();">login</button>
                <div class="error"></div>
            <div class="or">
                <div class="bar"></div>
                <p>OR</p>
                <div class="bar"></div>
            </div>
           
            <button class="intra" onclick="intra();"><img src="../../game/img/42_icon.svg" alt="">SIGN-IN with intra</button>
            <button onclick="getProfile();">test</button>
            <div class="end">
                <a onclick="go_to_register()">i don't have an account create</a>
            </div>
             
        </div>
    </div>
    `;
    }
}

customElements.define('login-elements', login);
}

