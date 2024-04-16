const gameOver = new Audio('Assets/GameOver.mp3');
const FoodSound = new Audio('Assets/food.mp3');
const moveSound = new Audio('Assets/Move.mp3');


let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 10 };
let snakeMove = { x: 0, y: 0 };
let score = 0;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}


function gameEngine() {

    if (isCollide(snakeArr)) {
        gameOver.play();
        snakeMove = { x: 0, y: 0 };
        alert("Game Over! Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        scoreCard.innerHTML = `Score: ${score}`;
    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        FoodSound.play();
        score += 1;
        scoreCard.innerHTML = `Score : ${score}`;
        snakeArr.unshift({ x: snakeArr[0].x + snakeMove.x, y: snakeArr[0].y + snakeMove.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }


    snakeArr[0].x += snakeMove.x;
    snakeArr[0].y += snakeMove.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    snakeMove = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            snakeMove.x = 0;
            snakeMove.y = -1;
            break;

        case 'ArrowDown':
            snakeMove.x = 0;
            snakeMove.y = 1;
            break;

        case 'ArrowLeft':
            snakeMove.x = -1;
            snakeMove.y = 0;
            break;

        case 'ArrowRight':
            snakeMove.x = 1;
            snakeMove.y = 0;
            break;

        default:
            break;
    }
});