const gameBoard= document.getElementById("gameBoard")
const ctx= gameBoard.getContext("2d")
const scoreText= document.getElementById("scoreText")
const resetBtn= document.getElementById("resetBtn")
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

window.addEventListener("Keydown",changeDirection)
resetBtn.addEventListener("click",resetGame)

gameStart();