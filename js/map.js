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
