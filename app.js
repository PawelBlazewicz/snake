const cvs = document.getElementById('cvs').getContext('2d');
//cvs.fillText("snake", 100, 100);
const Width = 500;
const Height =500;
//cvs.height = Height;
cvs.font = "20px";
let snakeList= [];
let foods= [];


const snakeCell ={
    width: 20,
    height: 20,
    color:'green'
};

const food = {
    width: 20,
    hight: 20,
    color: 'orange'
};

let direction = 99;
document.addEventListener('keydown', function(event){
    switch(event.keyCode) {
        case 37: 
            direction = 0; break;
        case 38: 
            direction = 1; break;
        case 39: 
            direction = 2; break;
        case 40: 
            direction = 3; break;
    }
} );

const drawSnake =(snake, i)=>{
    cvs.save();
    if (i===0){
        cvs.fillStyle = 'black';
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

const newGame =()=> {
    snakeList = [
        {x:240, y:200},
        {x:220, y:200},
        {x:200, y:200}
    ];
    foods = [];
    //console.log("fef");
    snakeList.forEach(drawSnake);
    
} 

newGame();

