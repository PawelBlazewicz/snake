const cvs = document.getElementById('cvs').getContext('2d');
//cvs.fillText("snake", 100, 100);
cvs.font = "20px";
const Width = 500;
const Height =500;
let snake = [
    {x:240, y:200},
    {x:220, y:200},
    {x:200, y:200}
];
let food= {};

const gridSize = 20;

let move = 20;
let direction = [0, move];
document.addEventListener('keydown', function(event){
    switch(event.keyCode) {
        case 37 || 65: 
            if (direction[0] != move ) {direction = [-move, 0];} break;
        case 38 || 87: 
            if (direction[1] != move ) {direction = [0, -move];} break;
        case 39: 
            if (direction[0] != -move ) {direction = [move, 0];} break;
        case 40: 
            if (direction[1] != -move ) {direction = [0, move];} break;
    }
} );

const drawSnake =(snake, i)=>{
    cvs.save();
    if (i===0){
      cvs.fillStyle = 'red';
    } else {
        cvs.fillStyle = "green";
    }
    cvs.fillRect(snake.x+1, snake.y+1, gridSize-2, gridSize-2);
    cvs.restore();
};

const makeFood = () =>{
    let x = Math.floor(Math.random() * 480);
    x -= x%20;
    let y = Math.floor(Math.random() * 480);
    y -= y%20;
    food = {x:x, y:y};
    console.log(food);
}

const drawFood =(food)=>{
    cvs.save();
    cvs.fillStyle = "orange";
    cvs.fillRect(food.x+1, food.y+1, gridSize-2, gridSize-2);
    cvs.restore();
};

const updateSnake =()=> {
    for (let i=snake.length-1; i >= 0; --i){
        if (snake[i].x === 0) {snake[i].x = 500}
        if (snake[i].y === 0) {snake[i].y = 500}
        if (i === 0){
            snake[i].x = (snake[i].x + direction[0])%Height;
            snake[i].y = (snake[i].y + direction[1])%Width;
        } else {
            snake[i].x = (snake[i-1].x)%Height;
            snake[i].y = (snake[i-1].y)%Width;
        }
    } 
} 

const updateBoard =()=> {
    cvs.clearRect(0,0,Width,Height);    
    snake.forEach(drawSnake);
    drawFood(food);
    updateSnake();    
}

const newGame =()=> {
    makeFood();
    setInterval(updateBoard,100);    
} 

newGame();

