

window.onload = function () {
    canvas = document.getElementById("arena");
    ctx = canvas.getContext("2d");
    var image = document.getElementById("img");
    image.style.display = "none";

    document.addEventListener("keydown", keyPush);
    var fps = 10;
    setInterval(game, 1000 / fps);
}

var scl = 20;

var snake = new snake(1, 1);
function snake(x, y) {
    this.x = x;
    this.y = y;
    this.speedx = 0;
    this.speedy = 0;
    this.total = 2;
    this.tail = [];
}

var food = new food(5, 5)
function food(x, y) {
    this.x = x;
    this.y = y;
}



function game() {

    snake.x += snake.speedx;
    snake.y += snake.speedy;

    if (snake.x < 0)
        snake.x = scl - 1;
    if (snake.x > scl)
        snake.x = 0;
    if (snake.y > scl)
        snake.y = 0;
    if (snake.y < 0)
        snake.y = scl - 1;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "blue";
    for (var i = 0; i < snake.tail.length; i++) {
        ctx.fillRect(snake.tail[i].x * scl, snake.tail[i].y * scl, scl - 2, scl - 2);
        if (snake.tail[i].x == snake.x && snake.tail[i].y == snake.y) {
            snake.total = 2;
        }
    }
    snake.tail.push({ x: snake.x, y: snake.y });

    while (snake.tail.length > snake.total)
        snake.tail.shift();

    if (snake.x == food.x && snake.y == food.y) {
        snake.total++;
        food.x = Math.floor(Math.random() * scl);
        food.y = Math.floor(Math.random() * scl);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * scl, food.y * scl, scl - 2, scl - 2);


}





function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            snake.speedx = -1;
            snake.speedy = 0;
            break;
        case 38:
            snake.speedx = 0;
            snake.speedy = -1;
            break;
        case 39:
            snake.speedx = 1;
            snake.speedy = 0;
            break;
        case 40:
            snake.speedx = 0;
            snake.speedy = 1;
            break;
    }
}

