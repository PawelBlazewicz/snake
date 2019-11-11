const cvs = document.getElementById('cvs').getContext('2d');
//cvs.fillText("snake", 100, 100);
const Width = 500;
const Height =500;
//cvs.height = Height;
cvs.font = "20px";
let snakeList= [];
let foods= [];


const snakeCell ={
    width: 18,
    height: 18,
    color:'green'
};

const food = {
    width: 20,
    hight: 20,
    color: 'orange'
};
let move = 20;
let direction = [0, move];
document.addEventListener('keydown', function(event){
    switch(event.keyCode) {
        case 37: 
            direction = [-move, 0]; break;
        case 38: 
            direction = [0, -move]; break;
        case 39: 
            direction = [move, 0]; break;
        case 40: 
            direction = [0, move]; break;
    }
} );

const drawSnake =(snake, i)=>{
    cvs.save();
    if (i===0){
      cvs.fillStyle = 'red';
    } else {
        cvs.fillStyle = snakeCell.color;
    }
    cvs.fillRect(snake.x, snake.y, snakeCell.width, snakeCell.height);
    cvs.restore();
};

const drawFood =(f, i)=>{
    cvs.save();
    cvs.fillStyle = food.color;
    cvs.fillRect(f.x, f.y, food.width, food.height);
    cvs.restore();
};

const updateSnake =()=> {
    for (let i=snakeList.length-1; i >= 0; --i){
        if (snakeList[i].x === 0) {snakeList[i].x = 500}
        if (snakeList[i].y === 0) {snakeList[i].y = 500}
        if (i === 0){
            snakeList[i].x = (snakeList[i].x + direction[0])%Height;
            snakeList[i].y = (snakeList[i].y + direction[1])%Width;
        } else {
            snakeList[i].x = (snakeList[i-1].x)%Height;
            snakeList[i].y = (snakeList[i-1].y)%Width;
        }
    } 
} 

const updateSnakePosition =()=> {
    cvs.fillRect(0,0,Width,Height);    
    snakeList.forEach(drawSnake);
    updateSnake();    
}



const newGame =()=> {
    snakeList = [
        {x:240, y:200},
        {x:220, y:200},
        {x:200, y:200}
    ];
    foods = [];
    //console.log("fef");
    snakeList.forEach(drawSnake);
    setInterval(updateSnakePosition,500);
    
} 

newGame();

