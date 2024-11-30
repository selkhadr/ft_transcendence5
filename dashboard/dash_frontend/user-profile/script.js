

window.onload = function() {
    let menu_icon_box = document.querySelector(".small-sidebar-container");
    let box = document.querySelector(".sidebar-container");

    menu_icon_box.onclick = function() {
        box.classList.toggle("active");
    };

    document.addEventListener('click', function(event) {
        let isClickInside = box.contains(event.target) || menu_icon_box.contains(event.target);

        if (!isClickInside) {
            box.classList.remove("active");
        }
    });

    window.addEventListener('resize', function() {
        box.classList.remove("active");
    });
}

let textarea = document.getElementById('textarea');
let counter_characters = document.querySelector('.counter_characters');

textarea.oninput = function(){
counter_characters.innerText = textarea.value.length;
}

function popBox() {
    document.querySelector('.popup-container > .popup-box').classList.add('popup-box-animate-up');
    document.querySelector('.popup-container').style.display = 'flex';
}

function closeBox() {
    document.querySelector('.popup-container').style.display = 'none';
}

window.addEventListener('load', function() {
    document.getElementById('textarea').value = localStorage.getItem('status');
});

function closeStatus() {
    document.querySelector('.popup-container').style.display = 'none';
}

function updateStatus() {
    document.querySelector('.popup-container').style.display = 'none';

    let txtarea = document.getElementById('textarea').value;

    localStorage.setItem('status', txtarea);

    let datax = { status: txtarea }

    fetch('http://127.0.0.1:8001/api/user/', {method: 'GET',credentials: 'include',})
    .then(response => response.json())
    .then(data => {

        fetch(`http://127.0.0.1:8004/user-info/${data.username}/`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(datax)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Status updated successfully:', data);
    })
    .catch((error) => {
        console.error('Error updating status:', error);
    });  
    })
 
}

document.addEventListener('click', function(event) {
    var element = document.querySelector('body > div.popup-container > div');
    var status_btn = document.querySelector('#status');
    let isClickInside = element.contains(event.target);
    let isClickInside_brn = status_btn.contains(event.target);

    if (!isClickInside && !isClickInside_brn) {
        closeBox();
    }
});

document.querySelector('.status').addEventListener('click', popBox);
document.querySelector('.update-cancel > .cancel').addEventListener('click', closeBox);
document.querySelector('.update-cancel > .enter').addEventListener('click', updateStatus);

/////////////////

// function updateData(data){
//     const fullname_ = document.getElementById('first-last');
//     const username_ = document.getElementById('username');
//     const date_ = document.getElementById('date');
//     const status_ = document.getElementById('status');
//     const score_ = document.getElementById('score');
//     const img_ = document.getElementById('pfp');

//     fullname_.innerHTML = '';
//     username_.innerHTML = '';
//     date_.innerHTML = '';
//     status_.innerHTML = '';
//     score_.innerHTML = '';
//     img_.innerHTML = '';

//     const fname = document.createElement('fname');
//     const uname = document.createElement('uname');
//     const time = document.createElement('time');
//     const stts = document.createElement('stts');
//     const scr = document.createElement('scr');

//     let date = new Date(data.date_cr);
//     let formattedDate = date.toLocaleDateString();
    
//     fname.textContent = data.full_name;
//     uname.textContent = data.username;
//     time.textContent = formattedDate;
//     stts.textContent = data.status;
//     scr.textContent = data.total_score;
//     img_.src = "http://127.0.0.1:8000" + data.profile_picture;

//     fullname_.appendChild(fname);
//     username_.appendChild(uname);
//     date_.appendChild(time);
//     status_.appendChild(stts);
//     score_.appendChild(scr);

//     console.log(localStorage.getItem('status'));

// }

// fetch(`http://127.0.0.1:8000/user-setting/${username}/`, {
//     method: 'GET',
//     })

//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Server is offline');
//         }
//         return response.json();
//     })

//     .then(data => {
//         document.getElementById('offline').style.display = 'none';
//         document.getElementById('online').style.display = 'flex';
//         updateData(data);
//     })
//     .catch(error => {
//         if (error.message === 'Server is offline') {
//             document.getElementById('online').style.display = 'none';
//             document.getElementById('offline').style.display = 'flex';
//             console.error('Server is offline');
//         }
//         else {
//             console.error('Error fetching data', error);
//         }
// });

function CompareRes(first, sec, user, winner, container){
    if (first == sec){
        container.querySelector('.res-icon > .res-image-plus').style.display = 'none';
        container.querySelector('.res-image-minus').style.display = 'none';
        container.querySelector('.res-image-equal').style.display = 'flex';

        container.querySelector('.f-user > .arrow_1').style.backgroundImage = "url('/icons/arrow2.svg')";
        container.querySelector('.sec-user > .arrow_2').style.backgroundImage = "url('/icons/arrow2.svg')";
    }
    else if (winner === user){
        container.querySelector('.res-icon > .res-image-plus').style.display = 'flex';
        container.querySelector('.res-image-minus').style.display = 'none';
        container.querySelector('.res-image-equal').style.display = 'none';

        container.querySelector('.f-user > .arrow_1').style.backgroundImage = "url('/icons/arrow.svg')";
        container.querySelector('.sec-user > .arrow_2').style.backgroundImage = "url('/icons/arrow2.svg')";
    }
    else{
        container.querySelector('.res-icon > .res-image-plus').style.display = 'none';
        container.querySelector('.res-image-minus').style.display = 'flex';
        container.querySelector('.res-image-equal').style.display = 'none';

        container.querySelector('.f-user > .arrow_1').style.backgroundImage = "url('/icons/arrow2.svg')";
        container.querySelector('.sec-user > .arrow_2').style.backgroundImage = "url('/icons/arrow.svg')";
    }
}

function CheckGameMode(type, container) {
    console.log("type: ", type);
    if (type == "online"){
        console.log("HERE");
        container.querySelector('.games-image-online').style.display = 'flex';
        container.querySelector('.games-icon > .games-text-online').style.display = 'flex';

        container.querySelector('.games-image-local').style.display = 'none';
        container.querySelector('.games-icon > .games-text-local').style.display = 'none';

        container.querySelector('.games-image-bot').style.display = 'none';
        container.querySelector('.games-icon > .games-text-bot').style.display = 'none';
    }

    else if (type == "local"){
        container.querySelector('.games-image-online').style.display = 'none';
        container.querySelector('.games-icon > .games-text-online').style.display = 'none';
    
        container.querySelector('.games-image-local').style.display = 'flex';
        container.querySelector('.games-icon > .games-text-local').style.display = 'flex';

        container.querySelector('.games-image-bot').style.display = 'none';
        container.querySelector('.games-icon > .games-text-bot').style.display = 'none';
    }

    else if (type == "bot"){
        container.querySelector('.games-image-online').style.display = 'none';
        container.querySelector('.games-icon > .games-text-online').style.display = 'none';

        container.querySelector('.games-image-local').style.display = 'none';
        container.querySelector('.games-icon > .games-text-local').style.display = 'none';

        container.querySelector('.games-image-bot').style.display = 'flex';
        container.querySelector('.games-icon > .games-text-bot').style.display = 'flex';
    }
}

function getAccuracy(scr1, scr2, container){
    let total_score = scr1 + scr2;

    let scr1Acc = ((scr1 / total_score) * 100).toFixed(0);
    let scr2Acc = ((scr2 / total_score) * 100).toFixed(0);

    container.querySelector('.Accuracy-container > .f-user-accuracy').innerHTML = scr1Acc + "%";
    container.querySelector('.Accuracy-container > .sec-user-accuracy').innerHTML = scr2Acc + "%";
}

function updateHistoryData(data, container) {

    container.querySelector('#first-user-name').innerHTML = data.player1;
    container.querySelector('#second-user-name').innerHTML = data.player2;
    container.querySelector('#f-user-score').innerHTML = data.score1;
    container.querySelector('#sec-user-score').innerHTML = data.score2;
    container.querySelector('#game-date').innerHTML = data.date;
    
    CheckGameMode(data.match_type, container);
    getAccuracy(data.score1, data.score2, container);
    CompareRes(data.score1, data.score2, "selkhadr", data.winner, container);
}

function addData(data) {
    const objCount = data.length;
    const contentContainer = document.getElementById('content-container');

    for (let i = 0; i < 10; i++){
        if (i >= objCount) {
            break;
        }

        let newContainer = document.querySelector('.stats-container').cloneNode(true);
        newContainer.style.display = 'flex';

        updateHistoryData(data[i], newContainer);
        console.log('Cloning and updating container for match:', data[i]);

        contentContainer.appendChild(newContainer);
    }
    document.querySelector('.stats-container').style.display = 'none';
}

// fetch('http://10.11.7.7:8000/matches/user/selkhadr/', {
//     method: 'GET',
// })
// .then(response => response.json())
// .then(data => {
//     document.getElementById('no-matches-container').style.display = 'none';
//     document.getElementById('content-container').style.display = 'flex';
//     addData(data);
// })
// .catch(error => {
//     console.error('Error fetching data', error);
// })

///////////////////////

function ShowPingContainer() {
    document.querySelector('.ping-content-container').style.display = 'flex';
    document.querySelector('.xo-content-container').style.display = 'none';

    document.querySelector('.pingBtn').classList.add('active-button');
    document.querySelector('.pingBtn').classList.remove('unactive-button');
    document.querySelector('.xoBtn').classList.remove('active-button');
}

function ShowXOContainer() {
    document.querySelector('.xo-content-container').style.display = 'flex';
    document.querySelector('.ping-content-container').style.display = 'none';

    document.querySelector('.xoBtn ').classList.add('active-button');
    document.querySelector('.pingBtn').classList.add('unactive-button');
    document.querySelector('.pingBtn').classList.remove('active-button');
}

