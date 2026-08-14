function addEnemies() {
  enemies = []; 

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
  const moveInterval = setInterval(() => {

    if (!enemies.includes(enemy)) {
      clearInterval(moveInterval);
      return;
    }

    const currentTop = parseInt(enemy.style.top);
    const currentLeft = parseInt(enemy.style.left);
    const currentRow = Math.round(currentTop / cellSize);
    const currentCol = Math.round(currentLeft / cellSize);

    const possibleMoves = [
      { row: currentRow - 1, col: currentCol }, 
      { row: currentRow + 1, col: currentCol },
      { row: currentRow, col: currentCol - 1 },
      { row: currentRow, col: currentCol + 1 }
    ];

    const validMoves = possibleMoves.filter(move => {
      return (
        move.row >= 0 &&
        move.row < map.length &&
        move.col >= 0 &&
        move.col < map[0].length &&
        map[move.row][move.col] !== "w"
      );
    });

    if (validMoves.length > 0) {
     
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      
      enemy.style.top = `${randomMove.row * cellSize}px`;
      enemy.style.left = `${randomMove.col * cellSize}px`;

      if (typeof checkCollision === "function") {
        checkCollision();
      }
    }
  }, 550);
}

addEnemies();
