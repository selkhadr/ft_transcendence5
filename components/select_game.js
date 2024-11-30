

export function select_game() {
    class MYcounter extends HTMLElement
    {
        constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
        @import './styles/select_game/style.css';
        // @import '../game/css/game_style.css';
        </style>
        <div class="quit" onclick="go_to_newhome();"></div>
        <h1 class="choose">Game Modes</h1>
        <div class="wrapper">
            <div class="body-container">
                    <button class="local-container" onclick="play_local()">
                        <div class="shape"></div>
                        <img src="./styles/select_game/df.png" class="ping-image">
                        <h1 class="online-txt">
                            <img src="./styles/sidebar/icons/local-hover.svg" class="local-hover">
                            LOCAL</h1>
                    </button>
        
                    <button class="online-container" onclick="play_online()">
                        <div class="shape"></div>
                        <img src="./styles/select_game/ty.png" class="ping-image">
                        <h1 class="online-txt">
                            <img src="./styles/sidebar/icons/online-hover.svg" class="local-hover">
                            ONLINE</h1>
                    </button>
        
                    <button class="bot-container" onclick="play_bot()">
                        <div class="shape"></div>
                        <img src="./styles/select_game/rt.png" class="ping-image">
                        <h1 class="online-txt">
                            <img src="./styles/sidebar/icons/bot-hover.svg" class="local-hover">
                            BOT</h1>
                    </button>
                </div>
            </div>
        </div>
        `;  
    }
    }
    customElements.define('select-game', MYcounter);
}


