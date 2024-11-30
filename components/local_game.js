export function load_local_game()
{
class gameLocal extends HTMLElement{
    constructor(){
        super();
    this.innerHTML = `
    <style>
        @import './game/css/style.css';
        @import './game/css/game_style.css';
    </style>
    <div class="conatainer">
        <div class="gametable">
            <div class="top">
                <div class="player_1">
                    <img src="../game/img/player_4.svg" alt="player 1">
                    <span>player_1</span>
                </div>
                <div class="score">
                    <span class="left_scor" id="left_scor">0</span>
                    <span style="color: #FFB71A;">:</span>
                    <span class="right_scor" id="right_scor" >0</span>

                </div>

                <div class="player_2">
                    <span>player_2</span>
                    <img src="../game/img/player_5.svg" alt="player 1">
                </div>
            </div>
            <canvas class="table" id="table"></canvas>

            <div class="buttom">
                <div class="player_1_option">
                    <div class="wall">
                        <img src="../game/img/wall_icon.svg" alt="">
                    </div>
                    <div class="speed">
                        <img src="../game/img/speed_icon.svg" alt="">
                    </div>
                    <div class="long_rockit">
                        <img src="../game/img/long_rockit.svg" alt="">
                    </div>
                </div>
                <div class="logo">
                    <img src="../game/img/logo.svg" alt="">
                </div>
                <div class="player_2_option">
                    <div class="wall">
                        <img src="../game/img/wall_icon.svg" alt="">
                    </div>
                    <div class="speed">
                        <img src="../game/img/speed_icon.svg" alt="">
                    </div>
                    <div class="long_rockit">
                        <img src="../game/img/long_rockit.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <button onclick="initializeGame();">dfdsf</button>
    </div>

    <script >
    
    </script>
    
    `;
    }
}
customElements.define('game-local', gameLocal);
}