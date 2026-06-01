function generateMap(width, height) {
    const map = [];
    
    // Заполняем стенами
    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            map[y][x] = { type: 'wall', items: [] };
        }
    }
    
    // Создаём комнаты и коридоры
    createRooms(map, width, height);
    connectRooms(map);
    
    // Добавляем объекты
    addGold(map, 10);
    addExit(map);
    
    return map;
}

function createRooms(map, width, height) {
    const roomCount = 5;
    for (let i = 0; i < roomCount; i++) {
        const roomWidth = Math.floor(Math.random() * 4) + 3;
        const roomHeight = Math.floor(Math.random() * 4) + 3;
        const x = Math.floor(Math.random() * (width - roomWidth - 2)) + 1;
        const y = Math.floor(Math.random() * (height - roomHeight - 2)) + 1;

        // Создаём комнату
        for (let ry = y; ry < y + roomHeight; ry++) {
            for (let rx = x; rx < x + roomWidth; rx++) {
                if (ry >= 0 && ry < height && rx >= 0 && rx < width) {
                    map[ry][rx].type = 'floor';
                }
            }
        }
    }
}

function connectRooms(map) {
    // Соединяем комнаты коридорами (упрощённая версия)
    const rooms = findRooms(map);
    for (let i = 0; i < rooms.length - 1; i++) {
        const room1 = rooms[i];
        const room2 = rooms[i + 1];

        // Горизонтальный коридор
        const startX = Math.min(room1.x, room2.x);
        const endX = Math.max(room1.x + room1.width, room2.x + room2.width);
        for (let x = startX; x <= endX; x++) {
            if (map[room1.y] && map[room1.y][x]) {
                map[room1.y][x].type = 'floor';
            }
        }

        // Вертикальный коридор
        const startY = Math.min(room1.y, room2.y);
        const endY = Math.max(room1.y + room1.height, room2.y + room2.height);
        for (let y = startY; y <= endY; y++) {
            if (map[y] && map[y][room2.x]) {
                map[y][room2.x].type = 'floor';
            }
        }
    }
}

function findRooms(map) {
    const rooms = [];
    const visited = Array(map.length).fill().map(() => Array(map[0].length).fill(false));

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x].type === 'floor' && !visited[y][x]) {
                // Находим границы комнаты
                const room = { x, y, width: 1, height: 1 };
                let rx = x, ry = y;
                while (map[ry] && map[ry][rx + 1] && map[ry][rx + 1].type === 'floor') {
                    room.width++;
                    rx++;
                }
                while (map[ry + 1] && map[ry + 1][x] && map[ry + 1][x].type === 'floor') {
                    room.height++;
            ry++;
        }

                rooms.push(room);

                // Помечаем комнату как посещённую
                for (let ry2 = room.y; ry2 < room.y + room.height; ry2++) {
                    for (let rx2 = room.x; rx2 < room.x + room.width; rx2++) {
                visited[ry2][rx2] = true;
            }
        }
            }
        }
    }
    return rooms;
}

function addGold(map, count) {
    for (let i = 0; i < count; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * map[0].length);
            y = Math.floor(Math.random() * map.length);
        } while (map[y][x].type !== 'floor' || map[y][x].items.length > 0);

        map[y][x].items.push({ type: 'gold', value: Math.floor(Math.random() * 10) + 5 });
    }
}

function addExit(map) {
    let x, y;
    do {
        x = Math.floor(Math.random() * map[0].length);
        y = Math.floor(Math.random() * map.length);
    } while (map[y][x].type !== 'floor');

    map[y][x].type = 'exit';
}
