export function load_profile()
{
class Profile extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
    @import './dashboard/dash_frontend/user-profile/head.css';
    @import '../styles/sidebar/sidebar.css';
    @import './dashboard/dash_frontend/user-profile/body.css';
</style>
    <div class="head-container">
    <div class="pfp-square">
        <img src="/icons/profile_photo.svg" id="pfp" class="profile-picture">
    </div>
        <div class="content-container">
            <div class="first-last">
                
                <button class="edit" onclick="go_to_settings()"></button>

                <h3 id="first-last">First-name & last-name</h3>
            </div>
            <div class="username">
                <h1 id="username">Username</h1>
            </div>
            <button class="status" onclick="popBox()" id="status">Enter your status here...</button>
            <div class="status-container">
                <div class="online-container" style="display: none;" id="online">
                    <div class="online-image"></div>
                    <div class="status-text" id="online-text">Online</div>
                </div>
                <div class="offline-container" style="display: flex;" id="offline">
                <div class="offline-image"></div>
                <div class="status-text" id="offline-text">Offline</div>
                </div>
                <div class="time-container">
                    <div class="time-image"></div>
                    <div class="time-status" id="date">01/01/2024</div>
                </div>
                <div class="add-friend-container" style="display: none;">
                    <button class="add-friend-image"></button>
                    <button class="add-friend-status">Add</button>
                </div>
                <div class="sent-friend-container" style="display: none;">
                    <div class="sent-friend-image"></div>
                    <div class="sent-friend-status">Sent</div>
                </div>
                <div class="friend-container" style="display: none;">
                    <div class="friend-image"></div>
                    <div class="friend-status">Friends</div>
                </div>
                <div class="score-container">
                    <div class="score-image"></div>
                    <div class="score-status" id="score">10</div>
                </div>
            
            </div>
        </div>
</div>
<div class="icons-container">
<div class="ping-container">
    <button class="pingBtn" onclick="ShowPingContainer()">Ping-Pong</button>
</div>
<div class="xo-container">
    <button class="xoBtn" onclick="ShowXOContainer()">x-o</button>
</div>
</div>

<div class="sidebar-container">
<div class="small-sidebar-container">
    <button class="small-sidebar-icon"></button>
</div>
<div class="logo-container"></div>
<div class="menu-container">
<div class="user-home-container">
            <button class="user-home-icon" onclick="go_to_newhome();"></button>
            <button class="user-home-text" id="user-chat-text" onclick="go_to_newhome();">Home</button>
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
        <div class="Games">Games</div>
        <div class="Results">Results</div>
        <div class="Accuracy">Accuracy</div>
        <div class="Date">Date</div>
    </div>
    <div class="no-matches-container" style="display: flex;" id="no-matches-container">no matches yet.</div>
    <div class="ping-content-container" id="content-container" style="display: none;">
        <div class="stats-container" style="display: none;">
            <div class="games-container">
                <div class="games-icon">

                    <div id="local-ic" class="games-image-local" style="display: none;"></div>
                    <div id="local-txt" class="games-text-local" style="display: none;">LOCAL</div>

                    <div id="bot-ic" class="games-image-bot" style="display: none;"></div>
                    <div id="bot-txt" class="games-text-bot" style="display: none;">BOT</div>

                    <div id="online-ic" class="games-image-online" style="display: none;"></div>
                    <div id="online-txt" class="games-text-online" style="display: none;">ONLINE</div>

                </div>
                <div class="games-users">
                    <div class="f-user">
                        <div class="arrow_1"></div>
                        <div class="first-user-text" id="first-user-name">Username_1</div>
                    </div>
                    <div class="sec-user">
                        <div class="arrow_2"></div>
                        <div class="second-user-text" id="second-user-name">Username_2</div>
                    </div>


                </div>
            </div>
            <div class="Results-container">
                <div class="res-num">
                    <div class="f-user-score" id="f-user-score">1</div>
                    <div class="sec-user-score" id="sec-user-score">1</div>
                </div>
                <div class="res-icon">
                    <div class="res-image-minus" style="display: none;" id="minus"></div>
                    <div class="res-image-plus" style="display: none;" id="plus"></div>
                    <div class="res-image-equal" style="display: none;" id="equal"></div>
                </div>
            </div>

            <div class="Accuracy-container">
                <div class="f-user-accuracy" id="firstAcc">50%</div>
                <div class="sec-user-accuracy" id="secAcc">50%</div>
            </div>
            <div class="date-container" id="game-date">01/01/2024</div>
        </div>
    </div>
    <div class="xo-content-container" style="display: none;" id="xo-content-container">
        <div class="xo-stats-container" style="display: none;">
            <div class="games-container">
                <div class="games-icon">

                    <div id="local-ic" class="games-image-local" style="display: none;"></div>
                    <div id="local-txt" class="games-text-local" style="display: none;">LOCAL</div>

                    <div id="bot-ic" class="games-image-bot" style="display: none;"></div>
                    <div id="bot-txt" class="games-text-bot" style="display: none;">BOT</div>

                    <div id="online-ic" class="games-image-online" style="display: none;"></div>
                    <div id="online-txt" class="games-text-online" style="display: none;">ONLINE</div>

                </div>
                <div class="games-users">
                    <div class="f-user">
                        <div class="arrow_1"></div>
                        <div class="first-user-text" id="first-user-name">Username_1</div>
                    </div>
                    <div class="sec-user">
                        <div class="arrow_2"></div>
                        <div class="second-user-text" id="second-user-name">Username_2</div>
                    </div>


                </div>
            </div>
            <div class="Results-container">
                <div class="res-num">
                    <div class="f-user-score" id="f-user-score">1</div>
                    <div class="sec-user-score" id="sec-user-score">1</div>
                </div>
                <div class="res-icon">
                    <div class="res-image-minus" style="display: none;" id="minus"></div>
                    <div class="res-image-plus" style="display: none;" id="plus"></div>
                    <div class="res-image-equal" style="display: none;" id="equal"></div>
                </div>
            </div>

            <div class="Accuracy-container">
                <div class="f-user-accuracy" id="firstAcc">50%</div>
                <div class="sec-user-accuracy" id="secAcc">50%</div>
            </div>
            <div class="date-container" id="game-date">01/01/2024</div>
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
<div class="popup-container" style="display: none;">
<div class="popup-box">
        <p class="enter">Enter your status:</p>
        <textarea class="input-text" id="textarea" maxlength="30"></textarea>
        <div class="counter">
            <p class="counter_characters">0</p><p>/</p><p>30</p>
        </div>
    <div class="update-cancel">
        <button class="cancel" onclick= "closeStatus()">Cancel</button>
        <button class="enter" onclick= "updateStatus()">Submit</button>
    </div>
</div>
</div>
    `;
  }
  connectedCallback() {
    function updateData(data){
        const fullname_ = document.getElementById('first-last');
        const username_ = document.getElementById('username');
        const date_ = document.getElementById('date');
        const status_ = document.getElementById('status');
        const score_ = document.getElementById('score');
        const img_ = document.getElementById('pfp');
    
        fullname_.innerHTML = '';
        username_.innerHTML = '';
        date_.innerHTML = '';
        status_.innerHTML = '';
        score_.innerHTML = '';
        img_.innerHTML = '';
    
        const fname = document.createElement('fname');
        const uname = document.createElement('uname');
        const time = document.createElement('time');
        const stts = document.createElement('stts');
        const scr = document.createElement('scr');
    
        let date = new Date(data.date_cr);
        let formattedDate = date.toLocaleDateString();
        
        fname.textContent = data.full_name;
        uname.textContent = data.username;
        time.textContent = formattedDate;
        stts.textContent = data.status;
        scr.textContent = data.total_score;
        img_.src = "http://127.0.0.1:8004" + data.profile_picture;
    
        fullname_.appendChild(fname);
        username_.appendChild(uname);
        date_.appendChild(time);
        status_.appendChild(stts);
        score_.appendChild(scr);
    
        console.log(localStorage.getItem('status'));
    
    }
    fetch('http://127.0.0.1:8001/api/user/', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        fetch(`http://127.0.0.1:8000/matches/user/${data.username}/`, {
    method: 'GET',
    credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
    document.getElementById('no-matches-container').style.display = 'none';
    document.getElementById('content-container').style.display = 'flex';
    addData(data);
})
.catch(error => {
    console.error('Error fetching data', error);
})
        fetch(`http://127.0.0.1:8004/user-setting/${data.username}/`, {
            method: 'GET',
            // credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server is offline');
                }
                return response.json();
            })
        
            .then(data => {
                document.getElementById('offline').style.display = 'none';
                document.getElementById('online').style.display = 'flex';
                updateData(data);
            })
            .catch(error => {
                if (error.message === 'Server is offline') {
                    document.getElementById('online').style.display = 'none';
                    document.getElementById('offline').style.display = 'flex';
                    console.error('Server is offline');
                }
                else {
                    console.error('Error fetching data', error);
                }
        });
        
    })
   
    
}
}

customElements.define('profile-elements', Profile);
}