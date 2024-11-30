function get_cookie_value(name) {
    let cookie_value = document.cookie.split(';').filter(cookie => cookie.includes(name))[0];
    return cookie_value.split('=')[1];
}
function start_game()
{
console.log("pritnt cookie" + document.cookie);
let gameSocket = new WebSocket(
    'ws://'
    + '127.0.0.1:8002'
    + '/ws/game/'
);

let table = document.getElementById('table');
let context = table.getContext('2d');
context.imageSmoothingEnabled = true;
table.width = getComputedStyle(table).getPropertyValue("width").slice(0, -2);
table.height = getComputedStyle(table).getPropertyValue("height").slice(0, -2);

let left_score_element = document.getElementById('left_scor');
let right_score_element = document.getElementById('right_scor');
let table_width = table.width;
let table_height = table.height;
let rockit_height = table_height/4;
let speedx = table_width/130;
let speedy = table_height/130;
let ball_radius = table_width/90;
let rockit_width = table_width/90;
let left_rockit_score = 0;
let right_rockit_score = 0;
let left_permision = false;
let right_permision = false;

gameSocket.onopen = function(event) {
    console.log('connected ====>');
    gameSocket.send(JSON.stringify({
        table_width: table_width,
        table_height: table_height,
        left_rockit_x: left_rockit.x + rockit_width,
        right_rockit_x: right_rockit.x,
    }));
};



class rockit
{
    constructor(x, y, width, height, color)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw()
    {
        
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class ball
{
    constructor(x,y, radius, color , status)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.status = false;
    }
    draw()
    {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fill();
    }
    move()
    {

        this.x += speedx;
        this.y += speedy;

        if((this.x + this.radius >= right_rockit.x) && (this.y + this.radius >= right_rockit.y) && (this.y - this.radius <= right_rockit.y + right_rockit.height))
        {
            this.x = right_rockit.x - this.radius;
            speedx = -speedx;
            gameSocket.send(JSON.stringify({
                'right_r': balll.x,
            }));
        }
        if((this.x - this.radius <= left_rockit.x + left_rockit.width) && (this.y + this.radius>= left_rockit.y) && (this.y - this.radius <= left_rockit.y + left_rockit.height))
        {
            this.x = left_rockit.x + left_rockit.width + this.radius;

            speedx = -speedx;
            if(speedx < 0 && speedx > -(table_width/100))
            {
                speedx += -0.5;
            }else if(speedx > 0 && speedx < table_width/100)
            {
                speedx += 0.5;
            }
            if(speedy < 0 && speedy > -(table_height/100))
            {
                speedy += -0.5;
            }else if(speedy > 0 && speedy < table_height/100)
            {
                speedy += 0.5;
            }
            gameSocket.send(JSON.stringify({
                'left_r': balll.x,
            }));
        }
        if(this.x + this.radius > table_width)
        {
            this.x = left_rockit.x + rockit_width + this.radius;
            this.y = left_rockit.y + rockit_height/2;
            this.status = false;
            left_rockit_score++;
            if(left_permision === true)
            {
                console.log("left_rockit_score");
                gameSocket.send(JSON.stringify({
                    'left_score': left_rockit_score,
                }));
                left_score_element.innerHTML = left_rockit_score;
            }  
        }

        if(this.x - this.radius < 0)
        {
            this.x = right_rockit.x - this.radius;
            this.y = right_rockit.y + rockit_height/2;
            this.status = false;
            right_rockit_score++;
            if(right_permision === true)
            {
                console.log("right_rockit_score");
                gameSocket.send(JSON.stringify({
                    'right_score': right_rockit_score,
                }));
                right_score_element.innerHTML = right_rockit_score;
            } 
        }
        if(this.y + this.radius > table_height)
        {
            speedy = -speedy;
            gameSocket.send(JSON.stringify({
                'down_r': balll.y,
                'ball_x': balll.x / table_width,
            }));

        }
        if(this.y - this.radius < 0)
        {
            speedy = -speedy;
            gameSocket.send(JSON.stringify({
                'top_r': balll.y,
                'ball_x': balll.x / table_width,
            }));
        }
    }
}




let left_rockit = new rockit(10, table_height/2 - rockit_height/2, rockit_width, rockit_height, '#FFB71A');
left_rockit.draw();

let right_rockit = new rockit(table_width - rockit_width - 10, table_height/2 - rockit_height/2, rockit_width, rockit_height, '#FFB71A');
right_rockit.draw();

let balll = new ball(table_width/2, table_height/2, ball_radius, 'white');
balll.draw();




gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data['left_y'] && right_permision === true) {

        left_rockit.y = data['left_y'];
        if(balll.x < table_width/2)
        {
            balll.status = true;
        }
        console.log("i am the lift one");


    }
    if (data['right_y'] && left_permision === true)
    {
        right_rockit.y = data['right_y'];
        if(balll.x > table_width/2)
        {
            balll.status = true;
        }

        console.log("cowcow");
    }
    if (data['start_game'])
    {
        balll.status = true;
    }
    if (data['left_r'])
    {

        balll.x = left_rockit.x + left_rockit.width + ball_radius;
        console.log("left_r");
    
    }

    if (data['right_r'])
    {

        balll.x = right_rockit.x - ball_radius;
        console.log("right_r");
    }

    if (data['top_r'])
    {

        balll.y = ball_radius;
        balll.x = data['ball_x'] * table_width;
    }


    if (data['down_r'])
    {

        balll.y = table_height - ball_radius;
        balll.x = data['ball_x'] * table_width;
    }
    if (data['player'])
    {
        if(data['player'] === 1)
        {
            left_permision = true;

            setTimeout(() => {
                fetch('http://127.0.0.1:8001/api/user/', { method: 'GET', credentials: 'include', })
                    .then(response => response.json()) // Convert the response data to a JSON object
                    .then(data => {
                        console.log(data.username);

                        gameSocket.send(JSON.stringify({
                            'name1': data.username,
                        }));
                       
                        document.querySelector('body > game-online > div > div > div.top > div.player_1 > span').innerHTML = data.username;
                    });
            }, 10);

        }
        if(data['player'] === 2)
        {
            right_permision = true;
            setTimeout(() => {

                fetch('http://127.0.0.1:8001/api/user/', { method: 'GET', credentials: 'include', })
                    .then(response => response.json()) // Convert the response data to a JSON object
                    .then(data => {
                        console.log(data.username);
                        gameSocket.send(JSON.stringify({
                            'name2': data.username,
                        }));
                       
                        document.querySelector('body > game-online > div > div > div.top > div.player_2 > span').innerHTML = data.username;
                    });
            }, 10);
        }
    }

    if (data['right_score'])
    {
        console.log("right_rockit_score is received");
        right_score_element.innerHTML = data['right_score'];
    }

    if (data['left_score'])
    {
        console.log("left_rockit_score is received");
        left_score_element.innerHTML = data['left_score'];
    }
    if (data['name1'])
    {
       console.log("the ==> " + data['name1']);
       document.querySelector('body > game-online > div > div > div.top > div.player_1 > span').innerHTML = data['name1'];

    }
    if (data['name2'])
    {
         console.log("the ==> " + data['name2']);
            document.querySelector('body > game-online > div > div > div.top > div.player_2 > span').innerHTML = data['name2'];
    }
};


let update = function()
{
    requestAnimationFrame(update);
    context.clearRect(0, 0, table_width, table_height);
    left_rockit.draw();
    right_rockit.draw();
    if(balll.status === true)
    {
        balll.move();
    }
    balll.draw();
}
update();



let keys = {};

window.addEventListener('keydown', function(e)
{
    keys[e.keyCode] = true;
    
    // console.log(keys);
});

window.addEventListener('keyup', function(e)
{
    delete keys[e.keyCode];
});

function keys_tracker()
{
    
   if(keys[87] && left_rockit.y > 0 && left_permision === true)
   {
        if(balll.x < table_width/2)
        {
            balll.status = true;
        }


        left_rockit.y -= 10;
        gameSocket.send(JSON.stringify({
        'left_y': left_rockit.y,
    }));
   }
   if(keys[83] && left_rockit.y < table_height - rockit_height && left_permision === true)
   { 
        if(balll.x < table_width/2)
        {
            balll.status = true;
        }

        left_rockit.y += 10;
        gameSocket.send(JSON.stringify({

        'left_y': left_rockit.y,
    }));
   }


   if(keys[38] && right_rockit.y > 0 && right_permision === true)
   {
    if(balll.x > table_width/2)
    {
        balll.status = true;
    }
    right_rockit.y -= 10;
    gameSocket.send(JSON.stringify({

        'right_y': right_rockit.y,
    }));

   }
   if(keys[40] && right_rockit.y < table_height - rockit_height && right_permision === true)
   {
    if(balll.x > table_width/2)
    {
        balll.status = true;
    }
    right_rockit.y += 10;
    gameSocket.send(JSON.stringify({
        'right_y': right_rockit.y,
    }));
   }

   requestAnimationFrame(keys_tracker);
}

keys_tracker();

}

