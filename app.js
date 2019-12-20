const cvs = document.getElementById('cvs').getContext('2d');
const Width = 500;
const Height = 500;
const gridSize = 25;

const snakeStart = [{
        x: 200 + 2 * gridSize,
        y: 200
    },
    {
        x: 200 + gridSize,
        y: 200
    },
    {
        x: 200,
        y: 200
    }
];
let snake;
let food = {};

let move = gridSize;
let direction = [0, move];
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37:
            if (direction[0] != move) {
                direction = [-move, 0];
            }
            break;
        case 38:
            if (direction[1] != move) {
                direction = [0, -move];
            }
            break;
        case 39:
            if (direction[0] != -move) {
                direction = [move, 0];
            }
            break;
        case 40:
            if (direction[1] != -move) {
                direction = [0, move];
            }
            break;
        case 32:
            clearInterval(run);
            newGame();
            break;
    }
});

const drawSnake = (snake, i) => {
    cvs.save();
    if (i === 0) {
        cvs.fillStyle = '#030f17';
    } else {
        cvs.fillStyle = "#0a2d47";
    }
    cvs.fillRect(snake.x + Math.min(~~(i / 3), 7), snake.y + Math.min(~~(i / 3), 7), gridSize - 2 * Math.min(~~(i / 3), 7), gridSize - 2 * Math.min(~~(i / 3), 7));
    cvs.restore();
};

const makeFood = () => {
    let x = Math.floor(Math.random() * (Height - gridSize));
    x -= x % gridSize;
    let y = Math.floor(Math.random() * (Width - gridSize));
    y -= y % gridSize;
    food = {
        x: x,
        y: y
    };
    console.log(food);
}

const drawFood = (food) => {
    cvs.save();
    cvs.fillStyle = "#FA673F";
    cvs.fillRect(food.x + 1, food.y + 1, gridSize - 2, gridSize - 2);
    cvs.restore();
};

const updateSnake = () => {
    for (let i = snake.length - 1; i >= 0; --i) {
        if (snake[i].x === 0) {
            snake[i].x = Height
        }
        if (snake[i].y === 0) {
            snake[i].y = Width
        }
        if (i === 0) {
            snake[i].x = (snake[i].x + direction[0]) % Height;
            snake[i].y = (snake[i].y + direction[1]) % Width;
        } else {
            snake[i].x = (snake[i - 1].x) % Height;
            snake[i].y = (snake[i - 1].y) % Width;
        }
    }
}

const snakeEat = () => {
    if (food.x === snake[0].x && food.y === snake[0].y) {
        snake.unshift(food);
        makeFood();
    }
}

const snakeEatSnake = () => {
    for (let i = 1; i < snake.length; ++i) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(run);
            cvs.fillRect(0, 0, Width, Height);
            cvs.fillStyle = "#000";
            cvs.clearRect(0, 0, Width, Height);
            console.log("game over");
            cvs.font = "60px Arial";
            cvs.fillText("Game Over", 90, 210);
            cvs.font = "20px Arial";
            cvs.fillText(`you survived long enough to eat ${snake.length -3} fruits`, 70, 280);
            cvs.fillText("Press SPACE to try again", 130, 330);
        }
    }
}

const updateBoard = () => {
    cvs.clearRect(0,0,Width,Height); 
    cvs.fillStyle = "#177A4D";
    cvs.fillRect(0, 0, Width, Height);
    snake.forEach(drawSnake);
    snakeEatSnake();
    snakeEat();
    drawFood(food);
    updateSnake();
}

const newGame = () => {
    snake = [...snakeStart];
    makeFood();
    run = setInterval(updateBoard, 100);
}

newGame();