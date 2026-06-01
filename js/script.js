const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

let score = 0;
let gameRunning = false;

// Объекты игры
const ball = { x: canvas.width / 2, y: canvas.height - 30, radius: 10, dx: 2, dy: -2 };
const paddle = { width: 75, height: 10, x: (canvas.width - 75) / 2 };

// Обработчики событий
document.addEventListener('keydown', keyDownHandler);
startButton.addEventListener('click', startGame);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.x += 7;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.x -= 7;
    }
}

function startGame() {
    gameRunning = true;
    score = 0;
    updateScore();
    draw();
}

function updateScore() {
    scoreElement.textContent = score;
}

function draw() {
    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка мяча
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // Отрисовка платформы
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // Логика движения мяча (упрощённо)
    if (gameRunning) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Отскок от стен
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
                score++;
                updateScore();
            } else {
                // Конец игры
                alert('Игра окончена! Ваш счёт: ' + score);
                gameRunning = false;
            }
        }

        requestAnimationFrame(draw);
    }
}
