function placePlayer() {
    // Размещаем игрока в случайной комнате
    const map = gameState.board;
    let x, y;
    do {
        x = Math.floor(Math.random() * map[0].length);
        y = Math.floor(Math.random() * map.length);
    } while (map[y][x].type !== 'floor');

    gameState.player.x = x;
    gameState.player.y = y;
}

function movePlayer(direction) {
    const { x, y } = gameState.player;
    let newX = x, newY = y;

    switch (direction) {
        case 'up': newY--; break;
        case 'down': newY++; break;
        case 'left': newX--; break;
        case 'right': newX++; break;
    }

    // Проверка границ и стен
    if (newY < 0 || newY >= gameState.board.length ||
        newX < 0 || newX >= gameState.board[0].length ||
        gameState.board[newY][newX].type === 'wall') {
        return; // Не двигаемся, если стена или выход за границы
    }

    // Двигаем игрока
    gameState.player.x = newX;
    gameState.player.y = newY;

    // Проверяем клетку на наличие предметов
    checkCellForItems(newX, newY);
}

function checkCellForItems(x, y) {
    const cell = gameState.board[y][x];
    if (cell.items.length > 0) {
        cell.items.forEach(item => {
            if (item.type === 'gold') {
                gameState.player.gold += item.value;
                addMessage(`Вы нашли ${item.value} золота!`);
            }
        });
        cell.items = []; // Убираем собранные предметы
    }

    // Проверка выхода
    if (cell.type === 'exit') {
        levelUp();
    }
}

function levelUp() {
    gameState.level++;
    addMessage(`Поздравляем! Вы перешли на уровень ${gameState.level}`);
    initGame(); // Новая карта для нового уровня
}
function killEnemy(enemyIndex) {
    // Удаляем врага
    gameState.enemies.splice(enemyIndex, 1);

    // Даём опыт
    const expGain = 25;
    gameState.player.exp += expGain;
    addMessage(`Вы победили врага! Опыт: +${expGain}`);

    // Проверка повышения уровня
    if (gameState.player.exp >= 100) {
        levelUp();
    }
}

// В функции attackPlayer добавьте проверку:
// если враг убит, вызовите killEnemy
