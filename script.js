const canvas = document.querySelector("canvas");
const gameOverScreen = document.querySelector("[data-div]")
const restartButton = document.querySelector(".restart")
const score = document.querySelector(".score")
const paragraph = document.querySelector("p")
const start = document.querySelector(".start")
const pause = document.querySelector(".pause")

let easy, medium, hard
canvas.width = "800"
canvas.height = "600"
let interval = null;
const snakeSize = 20;
let snakeWidth = 20;
let scoreGame = 0
let gameOverCheck = false
const ctx = canvas.getContext("2d");
let right,
    left, up, down;
let velX = 20,
    velY = 0;
pause.addEventListener("click", function() {
    currentX = velX                           
    currentY = velY
    velX = 0;
    velY = 0;
})
start.addEventListener("click", function() {
    velX = currentX
    velY = currentY
})
restartButton.addEventListener("click", restart)
document.addEventListener("keydown", play)
document.addEventListener("keyup", playNot)
let foodArray = []
function populateFoodArray() {
    for (let i = 0; i < 20; i++) {
        x = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize
        y = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize
        foodArray.push({
            x: x,
            y: y
        })
    }
    foodArrayLength = foodArray.length
}

function drawFood() {
    ctx.beginPath()
    ctx.fillStyle = "blue"
    ctx.fillRect(foodArray[0].x, foodArray[0].y, snakeSize, snakeWidth)
    ctx.closePath()
}
populateFoodArray()

console.log(foodArray)
function play(event) {
    let key = event.key
    if (key == "ArrowUp")
        up = true
    if (key == "ArrowDown")
        down = true
    if (key == "ArrowLeft")
        left = true
    if (key == "ArrowRight")
        right = true
}

function playNot(event) {
    let key = event.key
    if (key == "ArrowUp")
        up = false
    if (key == "ArrowDown")
        down = false
    if (key == "ArrowLeft")
        left = false
    if (key == "ArrowRight")
        right = false
}
snakeArray = [{
    x: 200,
    y: 200,
    snakeSize: 20,
    snakeWidth: 20
}]
function drawSnakeBody() {
    snakeArray.forEach(function(element) {
        drawSnake(element.x, element.y)
    })
}
function drawSnake(x, y) {
    ctx.beginPath()
    ctx.fillStyle = "red"
    ctx.fillRect(x, y, snakeSize, snakeWidth)
}
function direction() {
    if (right == true) {
        velX = snakeSize
        velY = 0
    }

    if (left == true) {
        velY = 0
        velX = -snakeSize
    }

    if (up == true) {
        velX = 0
        velY = -snakeSize
    }

    if (down == true) {
        velY = snakeSize
        velX = 0
    }
}
function checkScore() {
    const score = document.querySelector(".score")
    scoreGame = foodArrayLength - foodArray.length
    score.innerText = `Score:${scoreGame}`
}

function restart() {
    populateFoodArray()
    gameOverScreen.classList.replace("unhidden", "hidden")
    snakeArray[0].x = 200,
        snakeArray[0].y = 200
    snakeArray[0].snakeSize = 20,
        snakeArray[0].snakeWidth = 20
    velY = 0;
    velX = snakeSize
    snakeArray.length = 1
    scoreGame = 0
    animateSnake()
}

function moveSnake() {
    snakeArray.unshift({
        x: snakeArray[0].x + velX,
        y: snakeArray[0].y + velY
    })
    snakeArray.pop()
}

function collisionDetection() {
    if (snakeArray[0].x + snakeSize > canvas.width) {
        gameOverCheck = true
    }
    if (snakeArray[0].x < 0) {
        gameOverCheck = true
    }
    if (snakeArray[0].y + snakeSize > canvas.height) {
        gameOverCheck = true
    }
    if (snakeArray[0].y < 0) {
        gameOverCheck = true
    }
    snakeArray.forEach((element, index) => {
        if (snakeArray[0].x + snakeArray[0].snakeWidth == element.x + element.snakewidth && snakeArray[0].y + snakeArray[0].snakeWidth == element.y + element.snakeWidth) {
            console.log(element)
            gameOverCheck = true

        }
    })
    if (snakeArray[0].x == foodArray[0].x && snakeArray[0].y == foodArray[0].y) {
        snakeArray.push({
            x: x,
            y: y,
        })
        foodArray.shift()
    }
    moveSnake()
}
function changeGameState(state)
{
    clearInterval(interval)
    paragraph.innerText = state
    gameOverScreen.classList.replace("hidden", "unhidden")
    foodArray.length = 0;
    gameOverCheck = false;
}
function gameOver() {
    if(gameOverCheck)
    {
        if (foodArray.length > 0) {
            changeGameState("Game Over")
        } if (foodArray.length == 0) {
           changeGameState("You Won")
        }
    }
}
populateFoodArray()
function animateSnake() {
    interval = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        collisionDetection()
        drawSnakeBody()
        direction()
        drawFood()
        checkScore()
        gameOver()
    }, 200)
}
animateSnake()