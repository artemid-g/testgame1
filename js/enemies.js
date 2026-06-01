function spawnEnemies(count) {
    const map = gameState.board;
    for (let i = 0; i < count; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * map[0].length);
            y = Math.floor(Math.random() * map.length);
        } while (map[y][x].type !== 'floor' ||
               (Math.abs(x - gameState.player.x) < 5 && Math.abs(y - gameState.player.y) < 5));

        gameState.enemies.push({
            x, y,
            health: 20,
            attack: 5
        });
    }
}

function enemiesTurn() {
    gameState.enemies.forEach((enemy, index) => {
        // Простое поведение: движение к игроку
        if (enemy.x < gameState.player.x && canMove(enemy.x + 1, enemy.y)) enemy.x++;
        else if (enemy.x > gameState.player.x && canMove(enemy.x - 1, enemy.y)) enemy.x--;

        if (enemy.y < gameState.player.y && canMove(enemy.x, enemy.y + 1)) enemy.y++;
        else if (enemy.y > gameState.player.y && canMove(enemy.x, enemy.y - 1)) enemy.y--;

        // Проверка столкновения с игроком
        if (enemy.x === gameState.player.x && enemy.y === gameState.player.y) {
            attackPlayer(enemy);
        }
    });
}

function canMove(x, y) {
    // Проверка границ
    if (y < 0 || y >= gameState.board.length ||
        x < 0 || x >= gameState.board[0].length) {
        return false;
    }

    // Проверка стен и других врагов
    const cell = gameState.board[y][x];
    if (cell.type === 'wall') return false;

    for (const enemy of gameState.enemies) {
        if (enemy.x === x && enemy.y === y) return false;
    }

    return true;
}

function attackPlayer(enemy) {
    const damage = enemy.attack;
    gameState.player.health -= damage;
    addMessage(`Враг атаковал вас! Урон: ${damage}. Здоровье: ${gameState.player.health}`);

    if (gameState.player.health <= 0) {
        gameOver();
    }
}
