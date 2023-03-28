const gameBoard= document.querySelector("#gameBoard")
const ctx= gameBoard.getContext("2d")
const scoreText= document.querySelector("#scoreText")
const resetBtn= document.querySelector("#resetBtn")
const gameWidth= gameBoard.width;
const gameHeight= gameBoard.height

const boardBackground= "white"
const snakeColor= "Green"
const snakeBorder= "black"
const foodColor= "red"
const unitSize=25;

let running = false;
let xVelosity = unitSize;
let yVelosity = 0;

let foodX;
let foodY;

let score=0;
let snake=[
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
]

window.addEventListener("keydown",changeDirection)
resetBtn.addEventListener("click",resetGame)

gameStart();
function gameStart(){
    running=true
    scoreText.textContent=score 
    createFood()
    drawFood()
    nextTick()
}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        },75)
    }
    else{
        displayGameOver()
    }
}
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0, gameWidth,gameHeight);
}
function createFood(){
        function randomFood(min, max){
        const randNom= Math.round((Math.random()*(max-min)+ min)/unitSize) * unitSize
        return randNom
    }  
    foodX= randomFood(0, gameWidth-unitSize)
     foodY= randomFood(0, gameWidth-unitSize)
}
function drawFood() 
{
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
  }
  
function moveSnake(){
    const head={x:snake[0].x + xVelosity,
         y:snake[0].y + yVelosity}
         snake.unshift(head)
         if(snake[0].x == foodX && snake[0].y == foodY){
                score +=1
                scoreText.textContent= score
                createFood()
         }
         else{
            snake.pop()
         }
}
function drawSnake(){
    ctx.fillStyle=snakeColor
    ctx.strockeStyle = snakeBorder
    snake.forEach((snakePart)=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
       ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize); 
    })
}
function changeDirection(event){

        const keyPress=event.keyCode
        const LEFT= 37
        const RIGHT=39
        const UP= 38
        const DOWN=40

        const goingUp=(yVelosity== -unitSize)
        const goingDown=(yVelosity== unitSize)
        const goingLeft=(xVelosity== -unitSize)
        const goingRight=(xVelosity== unitSize)
      
        switch(true)
        {
            case(keyPress==LEFT && !goingRight):
                xVelosity= -unitSize
                yVelosity= 0;
                break;
            case(keyPress==RIGHT && !goingLeft):
                xVelosity= unitSize
                yVelosity= 0;
                break;
            case(keyPress==UP && !goingDown):
                xVelosity= 0
                yVelosity= -unitSize
                break;
            case(keyPress==DOWN && !goingUp):
                xVelosity= 0
                yVelosity= unitSize
                break;
        }
}
function checkGameOver(){
    switch(true)
    {
        case(snake[0].x < 0):
        running =false;
        break;
        case(snake[0].x >= gameWidth):
        running =false;
        break;
        case(snake[0].y < 0):
        running =false;
        break;
        case(snake[0].y >= gameHeight):
        running =false;
        break;
    }
    for(let i=1; i < snake.length; i+=1)
    {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        {
            running=false;
        }
    }
}
function displayGameOver(){
    ctx.font="50px MV Boli"
    ctx.fillStyle="black"
    ctx.textAlign="center"
    ctx.fillText("GAME OVER! 😝", gameWidth/2, gameHeight/2)
    running = false;
}
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
}

  