export function load_register() {
    class register extends HTMLElement {
        constructor(){
            super();
        this.innerHTML = ` 
        <style>
        @import './Authentication/frontend/register.css';
        </style>
        <div class="authentication">
         <div class="register">
            <img src="../../game/img/logo.svg" alt="" srcset="">
            <input type="text" id="re_name" placeholder="Enter your name", value="">
            <input type="text" id="re_mail" placeholder="Enter your email", value="">
            <input type="text" id="re_password" placeholder="enter your password" , value="">
            <button class="registerx" onclick="register();">SIGN-UP</button>
            <div class="error"></div>
            <div class="or">
                <div class="bar"></div>
                <p>OR</p>
                <div class="bar"></div>
            </div>
            <button class="intra" onclick="intra();"><img src="../../game/img/42_icon.svg" alt="">SIGN-IN with intra</button>
            
            <div class="end">
            <a onclick="go_to_login()">log in - and start playing</a>
            </div>
            
        </div>
        </div>
        
        `;
    }
}

customElements.define('register-elements', register);

}
