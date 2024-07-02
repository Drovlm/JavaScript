function addPlayer() {
  const player = document.createElement("div");
  player.className = "player";
  player.style.backgroundImage = "url('images/hero.png')";
  player.style.backgroundSize = "cover"; 
  player.style.width = `${cellSize}px`; 
  player.style.height = `${cellSize}px`; 
  let newRow, newCol;

  do {
      newRow = Math.floor(Math.random() * map.length);
      newCol = Math.floor(Math.random() * map[0].length);
  } while (map[newRow][newCol] === "w" || map[newRow][newCol] === "o");

  player.style.top = `${newRow * cellSize}px`;
  player.style.left = `${newCol * cellSize}px`;
  gridElement.appendChild(player);

  document.addEventListener("keydown", (event) => {
      switch (event.key) {
          case "ArrowUp":
          case "w":
          case "W":
              if (player.offsetTop > 0) {
                  const newRow = Math.floor((player.offsetTop - 25) / cellSize);
                  const newCol = Math.floor(player.offsetLeft / cellSize);
                  if (map[newRow][newCol] !== "w") {
                      player.style.top = `${Math.max(0, newRow * cellSize)}px`;
                      checkCollision();
                  }
              }
              break;
          case "ArrowDown":
          case "s":
          case "S":
              if (player.offsetTop < gridElement.clientHeight - player.clientHeight) {
                  const newRow = Math.floor((player.offsetTop + 25) / cellSize);
                  const newCol = Math.floor(player.offsetLeft / cellSize);
                  if (map[newRow][newCol] !== "w") {
                      player.style.top = `${Math.min(
                          gridElement.clientHeight - player.clientHeight,
                          newRow * cellSize
                      )}px`;
                      checkCollision();
                  }
              }
              break;
          case "ArrowLeft":
          case "a":
          case "A":
              if (player.offsetLeft > 0) {
                  const newRow = Math.floor(player.offsetTop / cellSize);
                  const newCol = Math.floor((player.offsetLeft - 25) / cellSize);
                  if (map[newRow][newCol] !== "w") {
                      player.style.left = `${Math.max(0, newCol * cellSize)}px`;
                      checkCollision();
                  }
              }
              break;
          case "ArrowRight":
          case "d":
          case "D":
              if (player.offsetLeft < gridElement.clientWidth - player.clientWidth) {
                  const newRow = Math.floor(player.offsetTop / cellSize);
                  const newCol = Math.floor((player.offsetLeft + 25) / cellSize);
                  if (map[newRow][newCol] !== "w") {
                      player.style.left = `${Math.min(
                          gridElement.clientWidth - player.clientWidth,
                          newCol * cellSize
                      )}px`;
                      checkCollision();
                  }
              }
              break;
      }
  });
}

function checkCollision() {
  const player = document.querySelector(".player");
  const playerTop = parseInt(player.style.top);
  const playerLeft = parseInt(player.style.left);

  for (const enemy of enemies) {
      const enemyTop = parseInt(enemy.style.top);
      const enemyLeft = parseInt(enemy.style.left);

      if (playerTop === enemyTop && playerLeft === enemyLeft) {
          alert("Game Over");
          // Optional: Add logic to reset the game or stop enemy movements.
      }
  }
}

addPlayer();
addEnemies();
