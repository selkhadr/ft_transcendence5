function initializeGame() {
let table = document.getElementById('table');
let context = table.getContext('2d');
context.imageSmoothingEnabled = true;
table.width = getComputedStyle(table).getPropertyValue("width").slice(0, -2);
table.height = getComputedStyle(table).getPropertyValue("height").slice(0, -2);

let left_score_element = document.getElementById('left_scor');
let right_score_element = document.getElementById('right_scor');
let table_width = table.width;
let table_height = table.height;
let rockit_width = 15;
let rockit_height = table_height/4;
let defoult_speed = 5;
let speedx = 7;
let speedy = 5;
let max_speed = 12;
let left_rockit_score = 0;
let right_rockit_score = 0;


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
        }
        if((this.x - this.radius <= left_rockit.x + left_rockit.width) && (this.y + this.radius>= left_rockit.y) && (this.y - this.radius <= left_rockit.y + left_rockit.height))
        {
            this.x = left_rockit.x + left_rockit.width + this.radius;

            speedx = -speedx;
        }
        if(this.x + this.radius > table_width)
        {
            this.x = left_rockit.x + rockit_width + this.radius;
            this.y = left_rockit.y + rockit_height/2;
            this.status = false;
            left_rockit_score++;
            left_score_element.innerHTML = left_rockit_score;
        }

        if(this.x - this.radius < 0)
        {
            this.x = right_rockit.x - this.radius;
            this.y = right_rockit.y + rockit_height/2;
            this.status = false;
            right_rockit_score++;
            right_score_element.innerHTML = right_rockit_score;
        }
        if((this.y + this.radius > table_height) || (this.y - this.radius < 0))
        {
            speedy = -speedy;
        }
    }
}






let left_rockit = new rockit(10, table_height/2 - rockit_height/2, rockit_width, rockit_height, '#FFB71A');
left_rockit.draw();

let right_rockit = new rockit(table_width - rockit_width - 10, table_height/2 - rockit_height/2, rockit_width, rockit_height, '#FFB71A');
right_rockit.draw();

let balll = new ball(table_width/2, table_height/2, 15, 'white');
balll.draw();

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
    balll.status = true;
    // console.log(keys);
});

window.addEventListener('keyup', function(e)
{
    delete keys[e.keyCode];
});

function keys_tracker()
{
    
   if(keys[87] && left_rockit.y > 0)
   {
       left_rockit.y -= 10;
   }
   if(keys[83] && left_rockit.y < table_height - rockit_height)
   {
       left_rockit.y += 10;
   }


   if(keys[38] && right_rockit.y > 0)
   {
    right_rockit.y -= 10;
   }

   if(keys[40] && right_rockit.y < table_height - rockit_height)
   {
    right_rockit.y += 10;

   }

   requestAnimationFrame(keys_tracker);
}

keys_tracker();




}


