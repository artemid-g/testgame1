function updateUI() {
    document.getElementById('health').textContent = gameState.player.health;
    document.getElementById('gold').textContent = gameState.player.gold;
    document.getElementById('level').textContent = gameState.player.level;
    document.getElementById('exp').textContent = `${gameState.player.exp}/100`;
}

function renderBoard() {
    const boardElement = document.getElementById('gameBoard');
    boardElement.innerHTML = '';

    for (let y = 0; y < gameState.board.length; y++) {
        for (let x = 0; x < gameState.board[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = `cell ${gameState.board[y][x].type}`;

            // Добавляем предметы
            if (gameState.board[y][x].items.length > 0) {
                gameState.board[y][x].items.forEach(item => {
                    if (item.type === 'gold') {
                cell.classList.add('gold-item');
                cell.textContent = '💰';
            }
        });
            }

            // Добавляем игрока
            if (gameState.player.x === x && gameState.player.y === y) {
                cell.classList.add('player');
                cell.textContent = '🛡️';
            }

            // Добавляем врагов
            gameState.enemies.forEach(enemy => {
                if (enemy.x === x && enemy.y === y) {
                    cell.classList.add('enemy');
            cell.textContent = '💀';
        }
            });

            boardElement.appendChild(cell);
        }
    }
}

function addMessage(text) {
    const log = document.getElementById('messageLog');
    const message = document.createElement('p');
    message.textContent = text;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight; // Автопрокрутка вниз
}

function gameOver() {
    gameState.gameRunning = false;
    addMessage('Игра окончена! Вы погибли...');
    alert(`Игра окончена! Ваш счёт: ${gameState.player.gold} золота, уровень: ${gameState.player.level}`);
}
