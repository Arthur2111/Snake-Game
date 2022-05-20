import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5; //SNAKE WILL MOVE 5 TIMES PER SECOND
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function update() {

    addSegments()
    const inputDirection = getInputDirection()

    // start with second last element in snakebody, if i is >= 0, i - 1 (decrement), run function where snakebody of element at the last element and make it into current element
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }; //setting the previous element to make it into the parent position
    }


    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount
}


// if snake is on food position
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => { // .some() checks if at least 1 condition is true and returns true
        if (ignoreHead && index === 0) return false // index === 0 will allow to ignore head as these conditions being true will return false   
        return equalPositions(segment, position) // if snake segment and position (position can be food or body) is same then return true
    })
}




export function getSnakeHead() {
    return snakeBody[0]
}

//return if snake head intersect with snake body
export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}


function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] }) // duplicate the last snake poistion and append it to the end of snake  body using .push
    }

    newSegments = 0
}