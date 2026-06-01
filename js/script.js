const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startButton = document.getElementById('startButton');

// Игровые переменные
let score = 0;
let lives = 3;
let gameRunning = false;
let paddleSpeed = 8;
let ballSpeed = 4;

// Объекты игры
const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: ballSpeed,
    dy: -ballSpeed,
    color: '#FF6B6B'
};

const paddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 20,
    speed: paddleSpeed,
    color: '#4ECDC4'
};

// Управление
const keys = {};
document.addEventListener('keydown', (e) => { keys[e.key] = true; });
document.addEventListener('keyup', (e) => { keys[e.key] = false; });
startButton.addEventListener('click', startGame);

function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    
    // Сброс позиции
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    paddle.x = (canvas.width - paddle.width) / 2;
    
    draw();
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateLives() {
    livesElement.textContent = lives;
}

function draw() {
    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка мяча
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
    
    // Отрисовка платформы
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
    
    // Логика игры (только если игра активна)
    if (!gameRunning) return;
    
    // Движение мяча
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Управление платформой
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        paddle.x -= paddle.speed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        paddle.x += paddle.speed;
    }
    
    // Ограничение движения платформы границами холста
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
    
    // Отскок от стен
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    // Проверка столкновения с платформой
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        score++;
        updateScore();
        
        // Ускорение игры каждые 5 очков
        if (score % 5 === 0) {
            ball.dx *= 1.1;
            ball.dy *= 1.1;
        }
    }
    
    // Проверка падения мяча
    if (ball.y + ball.radius > canvas.height) {
        lives--;
        updateLives();
        
        if (lives <= 0) {
            gameOver();
        } else {
            // Сброс позиции мяча
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 30;
            ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
            ball.dy = -ballSpeed;
        }
    }
    
    requestAnimationFrame(draw);
}

function gameOver() {
    gameRunning = false;
    alert(`Игра окончена! Ваш счёт: ${score}`);
}

// Запуск игры при загрузке страницы
window.onload = () => {
    startButton.focus();
