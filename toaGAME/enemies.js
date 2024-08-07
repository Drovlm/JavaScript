function addEnemies() {
  for (let i = 0; i < 10; i++) {
    const enemy = document.createElement("div");
    enemy.className = "enemies";
    enemy.style.backgroundImage = "url('images/enemy.png')";
    enemy.style.backgroundSize = "contain";

    let newRow, newCol;
    do {
      newRow = Math.floor(Math.random() * map.length);
      newCol = Math.floor(Math.random() * map[0].length);
    } while (map[newRow][newCol] === "w");

    enemy.style.top = `${newRow * cellSize}px`;
    enemy.style.left = `${newCol * cellSize}px`;
    gridElement.appendChild(enemy);

    enemies.push(enemy);
    moveRandomly(enemy);
  }
}

function moveRandomly(enemy) {
  setInterval(() => {
    let newRow, newCol;
    do {
      const direction = Math.floor(Math.random() * 4);
      const currentTop = parseInt(enemy.style.top);
      const currentLeft = parseInt(enemy.style.left);
      switch (direction) {
        case 0:
          newRow = currentTop / cellSize - 1;
          newCol = currentLeft / cellSize;
          break;
        case 1:
          newRow = currentTop / cellSize + 1;
          newCol = currentLeft / cellSize;
          break;
        case 2:
          newRow = currentTop / cellSize;
          newCol = currentLeft / cellSize - 1;
          break;
        case 3:
          newRow = currentTop / cellSize;
          newCol = currentLeft / cellSize + 1;
          break;
      }
    } while (
      newRow < 0 ||
      newRow >= map.length ||
      newCol < 0 ||
      newCol >= map[0].length ||
      map[newRow][newCol] === "w"
    );

    enemy.style.top = `${newRow * cellSize}px`;
    enemy.style.left = `${newCol * cellSize}px`;
    checkCollision();
  }, 500);
}

addEnemies();
