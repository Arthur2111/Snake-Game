import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'


let lastRenderTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')

// game loop -- function that repeats itself over again to update position of pixels
function main(currentTime) {
    if (gameOver) {
        if (confirm('you lost press OK to restart')) {
            window.location ='/'
        }
        return 
    }






    window.requestAnimationFrame(main); // when can browser render the next frame -- the main argument tells the browser when it can render the next frame      ie current time.
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    //if time since last render is less than 1/snakespeed then we dont need to move the snake.
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return // 1/SnakeSpeed = 0.5S, which is time between each move. We control snake speed to control how often the page is rendered

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}


function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

