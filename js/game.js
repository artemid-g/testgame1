// Глобальные переменные
let gameState = {
    board: [],
    player: { x: 0, y: 0, health: 100, gold: 0, level: 1, exp: 0 },
    enemies: [],
    gameRunning: false
};

// Инициализация игры
function initGame() {
    // Создаём карту
    gameState.board = generateMap(15, 15);
    
    // Размещаем игрока
    placePlayer();
    
    // Размещаем врагов
    spawnEnemies(5);
    
    // Обновляем интерфейс
    updateUI();
    renderBoard();
    
    gameState.gameRunning = true;
}

// Основной игровой цикл (пошаговый)
function gameLoop(direction) {
    if (!gameState.gameRunning) return;
    
    // Ход игрока
    movePlayer(direction);
    checkPlayerActions();
    
    // Ход врагов
    enemiesTurn();
    
    // Проверки состояния игры
    checkGameOver();
    updateUI();
    renderBoard();
}

// Запуск игры
document.addEventListener('keydown', (e) => {
    if (!gameState.gameRunning) return;
    
    let direction = null;
    switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': direction = 'up'; break;
        case 'ArrowDown': case 's': case 'S': direction = 'down'; break;
        case 'ArrowLeft': case 'a': case 'A': direction = 'left'; break;
        case 'ArrowRight': case 'd': case 'D': direction = 'right'; break;
    }
    
    if (direction) {
        gameLoop(direction);
    }
});

// Кнопка перезапуска
document.getElementById('restartButton').addEventListener('click', () => {
    initGame();
});

// Запускаем игру при загрузке
window.onload = initGame;
